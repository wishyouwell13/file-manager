// import {InputError}

import { InputError } from './errors.js';
import { join, isAbsolute, resolve } from 'path';
import { getState } from '../store/index.js';

export function showGreetingMessage(name) {
  console.dir(`Welcome to the File Manager, ${name}!`);
}

/**
 *
 * @param {Array<string>} options
 */

export function validateArguments(data = [], options = []) {
  // console.log(data.length);
  // console.log(options.size);
  if (data.length !== options.size && data.length > options.maxSize) {
    throw new InputError();
  }
}

const config = [
  {
    commmands: ['cd'],
    options: {
      size: 2,
    },
  },
];

export function normalizePath(src) {
  if (src === '~') {
    const home = getState('homedir');
    return home;
  }
  const currentDir = getState('currentDir');
  return isAbsolute(src) ? resolve(src) : resolve(join(currentDir, src));
}
