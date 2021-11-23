import _ from 'lodash';

const valueStyle = (value, tab) => {
  const tabs = ' '.repeat(tab);
  const keys = Object.keys(value);
  const styleChild = keys.map((key) => {
    const list = value[key];
    if (_.isObject(list)) {
      return `${tabs}${key}: {\n${valueStyle(list, tab + 4)}${tabs}}\n`;
    }
    return `${tabs}${key}: ${list}\n`;
  }).join('');
  return styleChild;
};

const makeValue = (value, tab, tabs) => {
  if (value === null) return String(value);
  switch (typeof value) {
    case 'object':
      return `{\n${valueStyle(value, tab + 4)}${tabs}}`;
    default:
      return value;
  }
};

const makeOperand = (tab, type) => {
  switch (type) {
    case 'added':
      return ' '.repeat(tab).concat('+ ');
    case 'removed':
      return ' '.repeat(tab).concat('- ');
    case 'updated':
      return [' '.repeat(tab).concat('- '), ' '.repeat(tab).concat('+ ')];
    default:
      return ' '.repeat(tab + 2);
  }
};

const makeStyle = (diff, tab = 4) => {
  const tabs = ' '.repeat(tab);
  const styleDiff = diff.map((data) => {
    const { type, property } = data;
    const tabOperand = makeOperand(tab - 2, type);
    switch (type) {
      case 'object': {
        const { child } = data;
        return `${tabOperand}${property}: {\n${makeStyle(child, tab + 4)}${tabs}}\n`;
      }
      case 'updated': {
        const { oldValue, newValue } = data;
        const beforeValue = makeValue(oldValue, tab, tabs);
        const afterValue = makeValue(newValue, tab, tabs);
        return `${tabOperand[0]}${property}: ${beforeValue}\n${tabOperand[1]}${property}: ${afterValue}\n`;
      }
      case 'added':
      case 'removed':
      case 'equal': {
        const { value } = data;
        const realValue = makeValue(value, tab, tabs);
        return `${tabOperand}${property}: ${realValue}\n`;
      }
      default:
        throw new Error('Wrong type in diff.');
    }
  })
    .join('');
  return styleDiff;
};

const stylish = (diff) => {
  const stylingDiff = `{\n${makeStyle(diff)}}`;
  return stylingDiff;
};
export default stylish;
