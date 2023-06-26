import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
// helpers
import { OperationError } from '../utils/errors.js';
import { validateArguments, normalizePath } from '../utils/helpers.js';

// No point to check is file exists,
// because terminal command 'cp' doesn't check it.

export const copy = async (args) => {
  validateArguments(args, {
    size: 2,
  });
  const [src, dest] = args;
  const filePath = normalizePath(src);
  const newFilePath = normalizePath(dest);

  const readable = createReadStream(filePath);
  const writable = createWriteStream(newFilePath);

  try {
    await pipeline(readable, writable);
  } catch {
    throw new OperationError();
  }
};
