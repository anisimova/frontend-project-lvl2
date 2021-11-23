import _ from 'lodash';

const makeValue = (value) => {
  switch (_.isObject(value)) {
    case true:
      switch (Array.isArray(value)) {
        case true:
          return value.map((val) => makeValue(val));
        default:
          return '[complex value]';
      }
    default:
      switch (typeof value) {
        case 'string':
          return `'${value}'`;
        default:
          return value;
      }
  }
};

const makePlain = (diff, parent = '') => {
  const result = diff.flatMap((data) => {
    const { type, property } = data;
    const key = (parent !== '') ? parent.concat('.', property) : property;
    switch (type) {
      case 'object': {
        const { child } = data;
        return makePlain(child, key);
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
      default:
        return '';
    }
  });
  return result;
};

const plain = (diff) => {
  const plainDiff = makePlain(diff).join('').replace(/\n$/, '');
  return plainDiff;
};

export default plain;
