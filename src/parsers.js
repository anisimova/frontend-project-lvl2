import _ from 'lodash';

const parsingFiles = (file1, file2) => {
  const unsortedkeys = _.union(Object.keys(file1), Object.keys(file2));
  const keys = _.sortBy(unsortedkeys);
  const differences = keys.map((key) => {
    if (_.has(file2, key) && !_.has(file1, key)) return `  + ${key}: ${file2[key]}`;
    if (_.has(file2, key) && file2[key] === file1[key]) return `    ${key}: ${file2[key]}`;
    if (_.has(file2, key) && file2[key] !== file1[key]) return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    return `  - ${key}: ${file1[key]}`;
  });
  const result = `{\n${differences.join('\n')}\n}`;
  return result;
};

export default parsingFiles;
