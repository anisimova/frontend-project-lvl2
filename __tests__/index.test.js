import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const resultJson = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

const yaml1 = getFixturePath('file1.yml');
const yaml2 = getFixturePath('file2.yml');
const resultYaml = '{\n  - file: 1\n  + file: 2\n  - follow: false\n    host: hexlet.io\n    project: hexlet-2\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

test('Test difference between 2 json files', () => {
  expect(genDiff(json1, json2)).toBe(resultJson);
});

test('Test difference between 2 yaml files', () => {
  expect(genDiff(yaml1, yaml2)).toBe(resultYaml);
});
