import _ from 'lodash';

const defaultTabs = 4;

const formatValue = (data, tab) => {
  if (data === null || !_.isObject(data)) return data;
  const tabsEnd = ' '.repeat(tab);
  const tabsOpen = ' '.repeat(tab + defaultTabs);
  const children = Object.entries(data);
  const styleChild = children.map(([key, value]) => `${tabsOpen}${key}: ${formatValue(value, tab + defaultTabs)}`);
  return `{\n${styleChild.join('\n')}\n${tabsEnd}}`;
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
        const beforeValue = formatValue(oldValue, tab);
        const afterValue = formatValue(newValue, tab);
        return `${tabOperand[0]}${property}: ${beforeValue}\n${tabOperand[1]}${property}: ${afterValue}\n`;
      }
      case 'added':
      case 'removed':
      case 'equal': {
        const { value } = data;
        const realValue = formatValue(value, tab);
        return `${tabOperand}${property}: ${realValue}\n`;
      }
      default:
        throw new Error(`Wrong type: ${type} in diff.`);
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
