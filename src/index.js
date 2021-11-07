import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';
import yaml from 'js-yaml';
import parsingFiles from './parsers.js';

const loadFile = (filepath) => {
  const realPath = path.resolve(cwd(), filepath);
  const fileType = path.extname(filepath);
  if (fileType === '.json') {
    const normalFileJson = JSON.parse(fs.readFileSync(realPath));
    return normalFileJson;
  }
  const normalFileYaml = yaml.load(fs.readFileSync(realPath));
  return normalFileYaml;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = loadFile(filepath1);
  const file2 = loadFile(filepath2);
  return parsingFiles(file1, file2);
};

export default genDiff;
