import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { getArgValue } from './cli/parse.js';

// helpers
import { showGreetingMessage, parseArguments } from './utils/helpers.js';
// store
import { dispatch, getState } from './store/index.js';

import { parse } from 'path';

const App = (() => {
  const rl = readline.createInterface({ input, output, prompt: '^(=^_^=)^:' });
  const username = getArgValue('--username');

  const inputHandler = async (str) => {
    //   console.log(str);
    const [action, ...options] = parseArguments(str);
    dispatch(action, options);
  };

  return {
    init() {
      showGreetingMessage(username);
      console.log(`\nYou are currently in ${getState('currentDir')}\n`);
      console.log('cwd: ', parse(process.cwd()).root);
      rl.prompt();
      rl.on('line', inputHandler);
      rl.on('close', () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      });
    },
  };
})();

App.init();
