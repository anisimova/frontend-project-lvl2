import _ from 'lodash';

const defaultTabs = 4;

const makeValue = (value, tab) => {
  if (value === null) return String(value);
  if (_.isObject(value)) {
    const tabs = ' '.repeat(tab);
    const keys = Object.keys(value);
    const styleChild = keys.map((key) => {
      const list = value[key];
      const tabsList = ' '.repeat(tab + defaultTabs);
      if (_.isObject(list)) {
        return `${tabsList}${key}: ${makeValue(list, tab + defaultTabs)}`;
      }
      return `${tabsList}${key}: ${list}`;
    }).join('\n');
    return `{\n${styleChild}\n${tabs}}`;
  }
  return value;
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

const makeStyle = (diff, tab = defaultTabs) => {
  const tabs = ' '.repeat(tab);
  const styleDiff = diff.map((data) => {
    const { type, property } = data;
    const tabOperand = makeOperand(tab - 2, type);
    switch (type) {
      case 'object': {
        const { children } = data;
        return `${tabOperand}${property}: {\n${makeStyle(children, tab + defaultTabs)}${tabs}}\n`;
      }
      case 'updated': {
        const { oldValue, newValue } = data;
        const beforeValue = makeValue(oldValue, tab);
        const afterValue = makeValue(newValue, tab);
        return `${tabOperand[0]}${property}: ${beforeValue}\n${tabOperand[1]}${property}: ${afterValue}\n`;
      }
      case 'added':
      case 'removed':
      case 'equal': {
        const { value } = data;
        const realValue = makeValue(value, tab);
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
