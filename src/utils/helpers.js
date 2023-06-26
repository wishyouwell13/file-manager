import { InputError } from './errors.js';
import { join, isAbsolute, resolve } from 'path';
import { getState } from '../store/index.js';

export function showGreetingMessage(name) {
  console.dir(`Welcome to the File Manager, ${name}!`);
}

export function validateArguments(data = [], options = {}) {
  if (data.length !== options.size && (!options.maxSize || data.length > options.maxSize)) {
    throw new InputError();
  }
}

export function parseArguments(str) {
  const re = /\s+(?![\w\s:\\/ ]+(?=["']))/;

  const res = str
    .trim()
    .split(re)
    .map((arg) => arg.replace(/["']([^"']+)["']/g, '$1'));

  return res;
}

export function normalizePath(src) {
  if (src === '~') {
    const home = getState('homedir');
    return home;
  }
  const currentDir = getState('currentDir');
  return isAbsolute(src) ? resolve(src) : resolve(join(currentDir, src));
}
