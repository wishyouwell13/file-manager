import { createReadStream } from 'fs';

import { OperationError } from '../utils/errors.js';
import { validateArguments, normalizePath } from '../utils/helpers.js';

export const cat = async (args) => {
  validateArguments(args, {
    size: 1,
  });

  const filePath = normalizePath(args[0]);
  const readableStream = createReadStream(filePath);

  try {
    await new Promise((resolve, reject) => {
      readableStream.on('error', (error) => reject(error));
      readableStream.on('end', () => resolve());
      readableStream.on('data', (chunk) => console.log(chunk.toString()));
    });
  } catch {
    throw new OperationError();
  }
};
