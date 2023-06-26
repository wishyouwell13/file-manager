import { createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

// helpers
import { OperationError } from '../utils/errors.js';
import { validateArguments, normalizePath } from '../utils/helpers.js';

export const decompress = async (args) => {
  validateArguments(args, {
    size: 2,
  });
  const [src, dist] = args;
  const filePath = normalizePath(src);
  const distFilePath = normalizePath(dist);

  const readable = createReadStream(filePath);
  const writable = createWriteStream(distFilePath);
  try {
    await pipeline(readable, createBrotliDecompress(), writable);
  } catch {
    throw new OperationError();
  }
};
