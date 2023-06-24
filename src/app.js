import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { getArgValue } from './cli/parse.js';
// helpers
import { showGreetingMessage } from './utils/helpers.js';
// store
import { dispatch, getState } from './store/index.js';

const App = (() => {
  const rl = readline.createInterface({ input, output, prompt: '^(=^_^=)^:' });
  const username = getArgValue('--username');
  const inputHandler = async (str) => {
    //   console.log(str);
    const [action, ...options] = str.split(' ');
    dispatch(action, options);
  };

  return {
    init() {
      showGreetingMessage(username);
      console.log(`\nYou are currently in ${getState('currentDir')}\n`);
      rl.prompt();
      rl.on('line', inputHandler);
      rl.on('close', () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      });
    },
  };
})();

App.init();
