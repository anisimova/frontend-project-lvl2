import _ from 'lodash';

const childrenStyle = (child, tab) => {
  const tabs = ' '.repeat(tab);
  const keys = Object.keys(child);
  const styleChild = keys.map((key) => {
    const value = child[key];
    if (_.isObject(value)) {
      return `${tabs}${key}: {\n${childrenStyle(value, tab + 4)}${tabs}}\n`;
    }
    return `${tabs}${key}: ${value}\n`;
  }).join('');
  return styleChild;
};

const makeOperand = (tab, type) => {
  switch (type) {
    case 'added':
      return ' '.repeat(tab).concat('+ ');
    case 'removed':
      return ' '.repeat(tab).concat('- ');
    case 'equal':
      return ' '.repeat(tab).concat('  ');
    case 'updated':
      return [' '.repeat(tab).concat('- '), ' '.repeat(tab).concat('+ ')];
    default:
      return ' '.repeat(tab + 2);
  }
};

const makeStyle = (diff, tab = 4) => {
  const tabs = ' '.repeat(tab);
  const styleDiff = diff.map((data) => {
    const {
      operation, type, attribute, value,
    } = data;
    const tabOperand = makeOperand(tab - 2, operation);
    switch (type) {
      case 'object':
        return `${tabOperand}${attribute}: {\n${makeStyle(value, tab + 4)}${tabs}}\n`;
      case 'value':
        return `${tabOperand}${attribute}: {\n${childrenStyle(value, tab + 4)}${tabs}}\n`;
      case 'updated':
        return `${tabOperand[0]}${attribute}: ${value[0]}\n${tabOperand[1]}${attribute}: ${value[1]}\n`;
      case 'updatedValue1':
        return `${tabOperand[0]}${attribute}: {\n${childrenStyle(value[0], tab + 4)}${tabs}}\n${tabOperand[1]}${attribute}: ${value[1]}\n`;
      case 'updatedValue2':
        return `${tabOperand[0]}${attribute}: ${value[0]}\n${tabOperand[1]}${attribute}: ${childrenStyle(value[1], tab + 4)}\n`;
      default:
        return `${tabOperand}${attribute}: ${value}\n`;
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
