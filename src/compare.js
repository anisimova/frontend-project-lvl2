import _ from 'lodash';

const fileComparison = (file1, file2) => {
  const makeFile = (acc, key) => {
    if (_.has(file2, key) && !_.has(file1, key)) {
      const newacc = `${acc}  + ${key}: ${file2[key]}\n`;
      return newacc;
    }
    if (_.has(file2, key) && file2[key] === file1[key]) {
      const newacc = `${acc}    ${key}: ${file2[key]}\n`;
      return newacc;
    }
    if (_.has(file2, key) && file2[key] !== file1[key]) {
      const newacc = `${acc}  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
      return newacc;
    }
    const newacc = `${acc}  + ${key}: ${file1[key]}\n`;
    return newacc;
  };
  const unsortedkeys = _.union(Object.keys(file1), Object.keys(file2));
  const keys = _.sortBy(unsortedkeys);
  const differences = keys.reduce(makeFile, '');
  const result = `{\n${differences}}`;
  return result;
};

export default fileComparison;
