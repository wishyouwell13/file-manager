// helpers
import { validateArguments, normalizePath } from '../utils/helpers.js';

// fs modules
import { cp, rm } from './index.js';

export const move = async (args) => {
  validateArguments(args, {
    size: 2,
  });

  await cp(args);
  await rm([args[0]]);

  // no need to catch errors there
};
