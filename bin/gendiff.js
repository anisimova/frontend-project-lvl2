#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';

const program = new Command();
program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.parse(process.argv);
const options = program.opts();