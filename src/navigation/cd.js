import { chdir } from 'process';

import { validateArguments } from '../utils/helpers.js';
import { OperationError } from '../utils/errors.js';
import { normalizePath } from '../utils/helpers.js';

import { commit } from '../store/index.js';

export default function cd(path) {
  validateArguments(path, {
    size: 1,
  });

  const newPath = normalizePath(path[0]);

  try {
    chdir(newPath);
    commit('currentDir', newPath);
  } catch (err) {
    throw new OperationError();
  }
}
