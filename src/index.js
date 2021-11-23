import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';
import yaml from 'js-yaml';
import makeDiff from './diff.js';
import styling from './formatters/index.js';

const parsering = (fileType, readingFile) => {
  switch (fileType) {
    case '.json':
      return JSON.parse(readingFile);
    case '.yml':
    case '.yaml':
      return yaml.load(readingFile);
    default:
      throw new Error('Wrong file. Use: JSON or YAML files.');
  }
};

const readFile = (filepath) => {
  const realPath = path.resolve(cwd(), filepath);
  const fileType = path.extname(filepath);
  const readingFile = fs.readFileSync(realPath, 'utf8');
  return parsering(fileType, readingFile);
};

const genDiff = (filepath1, filepath2, style = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const diff = makeDiff(file1, file2);
  const result = styling(diff, style);
  return result;
};

export default genDiff;
