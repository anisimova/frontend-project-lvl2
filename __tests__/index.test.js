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
const resultPlain = readFile(getFixturePath('testPlain.txt'));
const resultJSON = readFile(getFixturePath('testJSON.txt'));
const plainFormat = { format: 'plain' };
const jsonFormat = { format: 'json' };

test('Test difference between 2 json files - Stylish', () => {
  expect(genDiff(json1, json2)).toBe(resultStylish);
});

test('Test difference between 2 yaml files - Stylish', () => {
  expect(genDiff(yaml1, yaml2)).toBe(resultStylish);
});

test('Test difference between 2 json files - Plain', () => {
  expect(genDiff(json1, json2, plainFormat)).toBe(resultPlain);
});

test('Test difference between 2 yaml files - Plain', () => {
  expect(genDiff(yaml1, yaml2, plainFormat)).toBe(resultPlain);
});

test('Test difference between 2 json files - json', () => {
  expect(genDiff(json1, json2, jsonFormat)).toBe(resultJSON);
});

test('Test difference between 2 yaml files - json', () => {
  expect(genDiff(yaml1, yaml2, jsonFormat)).toBe(resultJSON);
});
