import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
// helpers
import { OperationError } from '../utils/errors.js';
import { validateArguments, normalizePath } from '../utils/helpers.js';

export const hash = async (args) => {
  validateArguments(args, {
    size: 1,
  });
  const filePath = normalizePath(args[0]);
  try {
    const fileData = await readFile(filePath, { encoding: 'utf-8' });
    const fileHash = createHash('sha256').update(fileData).digest('hex');
    console.log(fileHash);
  } catch {
    throw new OperationError();
  }
};
