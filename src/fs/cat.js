import { readFile } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { Writable } from 'node:stream';

import { OperationError } from '../utils/errors.js';
import { validateArguments, normalizePath } from '../utils/helpers.js';

export const cat = async (args) => {
  validateArguments(args, {
    size: 1,
  });

  const filePath = normalizePath(args[0]);
  try {
    await pipeline(createReadStream(filePath), process.stdout, { end: false });
  } catch (err) {
    throw new OperationError();
  }
};

// await read();
