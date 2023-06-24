import { writeFile } from 'fs/promises';

import { OperationError } from '../utils/errors.js';
import { validateArguments } from '../utils/helpers.js';

export const add = async (path) => {
  validateArguments(path, {
    size: 1,
  });

  const filePath = normalizePath(args[0]);
  try {
    await writeFile(filePath, '', { flag: 'wx' });
  } catch {
    throw new OperationError();
  }
};
