import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { getArgValue } from './cli/parse.js';
// helpers
import { showGreetingMessage, parseArguments } from './utils/helpers.js';
// store
import { dispatch, getState } from './store/index.js';

const App = (() => {
  const rl = readline.createInterface({ input, output, prompt: '>' });
  const username = getArgValue('--username');

  const inputHandler = async (str) => {
    const [action, ...options] = parseArguments(str);

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
      process.on('exit', () => {
        App.stop();
      });
    },
    stop() {
      rl.close();
    },
  };
})();

App.init();
