import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

import { OperationError } from '../utils/errors.js';
import { validateArguments, normalizePath } from '../utils/helpers.js';

export const cat = async (args) => {
  validateArguments(args, {
    size: 1,
  });

  const filePath = normalizePath(args[0]);
  try {
    const readable = createReadStream(filePath);
    const { stdout } = process;
    await pipeline(readable, stdout, { end: false });
  } catch (err) {
    throw new OperationError();
  }
};

// await read();
