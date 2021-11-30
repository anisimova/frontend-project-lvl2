import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';
import yaml from 'js-yaml';
import makeDiff from './diff.js';
import styling from './formatters/index.js';

const parser = (dataType, readingFile) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(readingFile);
    case 'yml':
    case 'yaml':
      return yaml.load(readingFile);
    default:
      throw new TypeError(`Wrong file type. You used: ${dataType}. Please, use: JSON or YAML files.`);
  }
};

const readFile = (filepath) => {
  const realPath = path.resolve(cwd(), filepath);
  const dataType = path.extname(filepath).substr(1);
  const readingFile = fs.readFileSync(realPath, 'utf8');
  return parser(dataType, readingFile);
};

const genDiff = (filepath1, filepath2, style = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const diff = makeDiff(file1, file2);
  const result = styling(diff, style);
  return result;
};

export default genDiff;
