import { readdir } from 'fs/promises';

import { validateArguments } from '../utils/helpers.js';
import { OperationError } from '../utils/errors.js';
import { normalizePath } from '../utils/helpers.js';

export default async function ls(args) {
  // can be zero or one arguments
  validateArguments(args, {
    size: 0,
    maxSize: 1,
  });

  const path = args[0] || '';
  const pathToDir = normalizePath(path);
  try {
    const dir = await readdir(pathToDir, { withFileTypes: true });

    const currentFileSystem = dir.reduce(normalizeFsDisplay, []).sort(sortFs);

    console.table(currentFileSystem);
  } catch {
    throw new OperationError();
  }
}

function sortFs(entryA, entryB) {
  if (entryA.type === entryB.type) {
    return entryA.name.localeCompare(entryB.name, false, { numeric: true });
  }

  return entryA.type === 'directory' ? -1 : 1;
}
// if entry(Dirent) is a file or a directory,
// then display it in form { name => value, type: value }
function normalizeFsDisplay(res = [], entry) {
  if (!entry.isFile() && !entry.isDirectory()) return res;
  res.push({
    name: entry.name,
    type: entry.isDirectory() ? 'directory' : 'file',
  });
  return res;
}
