import { rm } from 'fs/promises';

import { OperationError } from '../utils/errors.js';
import { validateArguments, normalizePath } from '../utils/helpers.js';

export const remove = async (args) => {
  validateArguments(args, {
    size: 1,
  });

  const filePath = normalizePath(args[0]);
  try {
    await rm(filePath, { recursive: true });
  } catch {
    throw new OperationError();
  }
};
