import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';
import yaml from 'js-yaml';
import parsingFiles from './parsers.js';
import stylish from './stylish.js';

const loadFile = (filepath) => {
  const realPath = path.resolve(cwd(), filepath);
  const fileType = path.extname(filepath);
  const readingFile = fs.readFileSync(realPath, 'utf8');
  if (fileType === '.json') {
    const normalFileJson = JSON.parse(readingFile);
    return normalFileJson;
  }
  const normalFileYaml = yaml.load(readingFile);
  return normalFileYaml;
};

const genDiff = (filepath1, filepath2, style = 'stylish') => {
  const file1 = loadFile(filepath1);
  const file2 = loadFile(filepath2);
  const diff = parsingFiles(file1, file2);
  if (style === 'stylish') {
    const result = stylish(diff);
    return result;
  }
  return diff;
};

export default genDiff;
