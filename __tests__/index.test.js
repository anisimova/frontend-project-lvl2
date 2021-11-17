import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yaml1 = getFixturePath('file1.yml');
const yaml2 = getFixturePath('file2.yml');
const resultStylish = readFile(getFixturePath('testStylish.txt'));

test('Test difference between 2 json files', () => {
  expect(genDiff(json1, json2)).toBe(resultStylish);
});

test('Test difference between 2 yaml files', () => {
  expect(genDiff(yaml1, yaml2)).toBe(resultStylish);
});
