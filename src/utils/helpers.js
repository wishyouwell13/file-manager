import { InputError } from './errors.js';
import { join, isAbsolute, resolve } from 'path';
import { getState } from '../store/index.js';

export function showGreetingMessage(name) {
  console.dir(`Welcome to the File Manager, ${name}!`);
}

export function validateArguments(data = [], options = []) {
  if (data.length !== options.size && data.length > options.maxSize) {
    throw new InputError();
  }
}

export function parseArguments(str) {
  const re = /\s+(?![\w:\\/ ]+(?=["]))/;

  const res = str
    .trim()
    .split(re)
    .map((arg) => arg.replace(/"/g, ''));

  return res;
}

export function normalizePath(src) {
  src = src.trim();
  if (src === '~') {
    const home = getState('homedir');
    return home;
  }
  const currentDir = getState('currentDir');
  return isAbsolute(src) ? resolve(src) : resolve(join(currentDir, src));
}
