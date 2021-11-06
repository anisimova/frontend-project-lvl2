import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';
import fileComparison from './compare.js';

const loadFile = (filepath) => {
  const realPath = path.resolve(cwd(), filepath);
  const normalFile = JSON.parse(fs.readFileSync(realPath));
  return normalFile;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = loadFile(filepath1);
  const file2 = loadFile(filepath2);
  return fileComparison(file1, file2);
};

export default genDiff;
