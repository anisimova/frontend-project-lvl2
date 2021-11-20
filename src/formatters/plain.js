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
    const {
      operation, attribute, value,
    } = data;
    const key = (parent !== '') ? parent.concat('.', attribute) : attribute;
    if (operation === 'equal' && Array.isArray(value)) {
      return makePlain(value, key);
    }
    const plainValue = makeValue(value);
    switch (operation) {
      case 'removed':
        return `Property '${key}' was ${operation}\n`;
      case 'added':
        return `Property '${key}' was ${operation} with value: ${plainValue}\n`;
      case 'updated':
        return `Property '${key}' was ${operation}. From ${plainValue[0]} to ${plainValue[1]}\n`;
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
