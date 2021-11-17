import _ from 'lodash';

const parsingFiles = (file1, file2) => {
  const unsortedkeys = _.union(Object.keys(file1), Object.keys(file2));
  const keys = _.sortBy(unsortedkeys);
  const diff = keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        operation: 'equal',
        attribute: key,
        value: parsingFiles(file1[key], file2[key]),
      };
    }
    if (_.isObject(file1[key]) && _.has(file2, key) && !_.isObject(file2[key])) {
      return [{
        operation: 'subtract',
        type: 'value',
        attribute: key,
        value: file1[key],
      },
      {
        operation: 'add',
        attribute: key,
        value: file2[key],
      }];
    }
    if (_.isObject(file2[key]) && _.has(file1, key) && !_.isObject(file1[key])) {
      return [{
        operation: 'add',
        attribute: key,
        value: file1[key],
      },
      {
        operation: 'subtract',
        type: 'value',
        attribute: key,
        value: file2[key],
      }];
    }
    if (_.isObject(file1[key]) && (!_.isObject(file2[key]) || !_.has(file2, key))) {
      return {
        operation: 'subtract',
        type: 'value',
        attribute: key,
        value: file1[key],
      };
    }
    if ((!_.isObject(file1[key]) || !_.has(file1, key)) && _.isObject(file2[key])) {
      return {
        operation: 'add',
        type: 'value',
        attribute: key,
        value: file2[key],
      };
    }
    if (_.has(file2, key) && !_.has(file1, key)) {
      return {
        operation: 'add',
        attribute: key,
        value: file2[key],
      };
    }
    if (_.has(file2, key) && file2[key] === file1[key]) {
      return {
        operation: 'equal',
        attribute: key,
        value: file2[key],
      };
    }
    if (_.has(file2, key) && file2[key] !== file1[key]) {
      return [{
        operation: 'subtract',
        attribute: key,
        value: file1[key],
      },
      {
        operation: 'add',
        attribute: key,
        value: file2[key],
      }];
    }
    return {
      operation: 'subtract',
      attribute: key,
      value: file1[key],
    };
  });
  return diff;
};

export default parsingFiles;
