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
    case 'add':
      return ' '.repeat(tab - 2).concat('+ ');
    case 'subtract':
      return ' '.repeat(tab - 2).concat('- ');
    case 'equal':
      return ' '.repeat(tab - 2).concat('  ');
    default:
      return ' '.repeat(tab - 2);
  }
};

const makeStyle = (diff, tab = 4) => {
  const tabs = ' '.repeat(tab);
  const styleDiff = diff.map((data) => {
    const {
      operation, type, attribute, value,
    } = data;
    const tabOperand = makeOperand(tab, operation);
    if (Array.isArray(data)) {
      return makeStyle(data, tab);
    }
    if (type === 'value') {
      return `${tabOperand}${attribute}: {\n${childrenStyle(value, tab + 4)}${tabs}}\n`;
    }
    if (_.isObject(value)) {
      return `${tabOperand}${attribute}: {\n${makeStyle(value, tab + 4)}${tabs}}\n`;
    }
    return `${tabOperand}${attribute}: ${value}\n`;
  })
    .join('');
  return styleDiff;
};

const stylish = (diff) => {
  const stylingDiff = `{\n${makeStyle(diff)}}`;
  return stylingDiff;
};
export default stylish;
