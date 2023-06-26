// built-in modules
import { homedir } from 'os';
// modules
import { getOsInfo } from '../os/index.js';
import { cd, ls, up } from '../navigation/index.js';
import { add, cp, cat, rn, rm, mv } from '../fs/index.js';
import { compress, decompress } from '../zip/index.js';
import { hash } from '../hash/index.js';
// utils
import { InputError } from '../utils/errors.js';

// state
const AppState = {
  currentDir: homedir(),
  homedir: homedir(),
};

// list of actions
const ListActions = {
  '.exit': () => process.exit(0),
  add,
  mv,
  cd,
  ls,
  up,
  cp,
  cat,
  rn,
  rm,
  hash,
  compress,
  decompress,
  os: getOsInfo,
};

// Function execute action and handle errors
export const dispatch = async (action, payload) => {
  try {
    if (!(action in ListActions)) {
      throw new InputError();
    }
    const currentAction = ListActions[action];

    await Promise.resolve(currentAction(payload));

    console.log(`You are currently in ${AppState.currentDir}`);
  } catch (err) {
    console.error(err.message);
  }
};

// Function to change state property
export const commit = (prop, payload) => {
  AppState[prop] = payload;
};

// Function to get state property
export const getState = (key) => {
  return AppState[key];
};
