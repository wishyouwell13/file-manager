// built-in modules
import { homedir } from 'node:os';
// modules
import { getOsInfo } from '../os/index.js';
import { cd, ls, up } from '../navigation/index.js';
import { add, cp, cat, rn, rm } from '../fs/index.js';
// utils
import { InputError } from '../utils/errors.js';

// state
const AppState = {
  // currentDir: homedir(),
  // homedir: homedir(),
  homedir: process.cwd(),
  currentDir: process.cwd(),
};

// list of actions
const ListActions = {
  // '.exit': exit,
  add,
  cd,
  ls,
  up,
  cp,
  cat,
  rn,
  rm,
  os: getOsInfo,
};

// Function execute action
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
// Function changes state property
export const commit = (prop, payload) => {
  AppState[prop] = payload;
};

// Function to get state property
export const getState = (key) => {
  return AppState[key];
};
