import { cp as nodeCp } from 'fs/promises';
import { join } from 'path';

import { OperationError } from '../utils/errors.js';
import { validateArguments } from '../utils/helpers.js';
import { getState } from '../store/index.js';

export const copy = async (args) => {
  validateArguments(args, {
    size: 2,
  });
  const [src, dest] = args;
  const currentDir = getState('currentDir');

  try {
    await nodeCp(join(currentDir, src), join(currentDir, dest), {
      recursive: true,
      force: false,
      errorOnExist: true,
    });
  } catch {
    throw new OperationError();
  }
};
