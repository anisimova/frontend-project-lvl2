import _ from 'lodash';

const makeDiff = (file1, file2) => {
  const unsortedkeys = _.union(Object.keys(file1), Object.keys(file2));
  const keys = _.sortBy(unsortedkeys);
  const diff = keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        type: 'object',
        property: key,
        child: makeDiff(file1[key], file2[key]),
      };
    }
    if (_.has(file2, key) && !_.has(file1, key)) {
      return {
        type: 'added',
        property: key,
        value: file2[key],
      };
    }
    if (_.has(file2, key) && file2[key] === file1[key]) {
      return {
        type: 'equal',
        property: key,
        value: file2[key],
      };
    }
    if (_.has(file2, key) && file2[key] !== file1[key]) {
      return {
        type: 'updated',
        property: key,
        oldValue: file1[key],
        newValue: file2[key],
      };
    }
    return {
      type: 'removed',
      property: key,
      value: file1[key],
    };
  });
  return diff;
};

export default makeDiff;
