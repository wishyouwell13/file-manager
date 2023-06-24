import { rename as fsRename } from 'fs/promises';

import { OperationError } from '../utils/errors.js';
import { validateArguments, normalizePath } from '../utils/helpers.js';
import { getState } from '../store/index.js';

export const rn = async (args) => {
  validateArguments(args, {
    size: 2,
  });

  const src = normalizePath(args[0]);
  const dist = normalizePath(args[1]);

  try {
    await fsRename(src, dist);
  } catch {
    throw new OperationError();
  }
};

// await rename();
