// helpers
import { validateArguments } from '../utils/helpers.js';
import { normalizePath } from '../utils/helpers.js';
// store
import { commit } from '../store/index.js';

export default function up(args = []) {
  validateArguments(args, {
    size: 0,
    maxSize: 0,
  });

  const newPath = normalizePath('..');
  commit('currentDir', newPath);
}
