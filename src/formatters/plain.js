import _ from 'lodash';

const makeValue = (value) => {
  switch (_.isPlainObject(value)) {
    case true:
      return '[complex value]';
    case false:
      switch (typeof value) {
        case 'object':
          return value === null ? null : value.map((val) => makeValue(val));
        case 'string':
          return `'${value}'`;
        default:
          return value;
      }
    default:
      return '';
  }
};

const makePlain = (diff, parent = '') => {
  const result = diff.flatMap((data) => {
    const { type, property } = data;
    const key = (parent !== '') ? parent.concat('.', property) : property;
    switch (type) {
      case 'object': {
        const { children } = data;
        return makePlain(children, key);
      }
      case 'removed':
        return `Property '${key}' was ${type}\n`;
      case 'added': {
        const { value } = data;
        const plainValue = makeValue(value);
        return `Property '${key}' was ${type} with value: ${plainValue}\n`;
      }
      case 'updated': {
        const { oldValue, newValue } = data;
        const beforeValue = makeValue(oldValue);
        const afterValue = makeValue(newValue);
        return `Property '${key}' was ${type}. From ${beforeValue} to ${afterValue}\n`;
      }
      case 'equal':
        return '';
      default:
        throw new Error(`Wrong type: ${type} in diff.`);
    }
  });
  return result;
};

const plain = (diff) => {
  const plainDiff = makePlain(diff).join('').replace(/\n$/, '');
  return plainDiff;
};

export default plain;
