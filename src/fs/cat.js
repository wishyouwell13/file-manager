import { readFile } from 'fs/promises';

import { OperationError } from '../utils/errors.js';
import { validateArguments, normalizePath } from '../utils/helpers.js';

export const cat = async (args) => {
  validateArguments(args, {
    size: 1,
  });

  const filePath = normalizePath(args[0]);
  try {
    const contents = await readFile(filePath, {
      encoding: 'utf8',
    });
    console.log(contents);
  } catch (err) {
    throw new OperationError();
  }
};

// await read();
