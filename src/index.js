import * as readline from 'node:readline/promises';
import { homedir } from 'node:os';
import { stdin as input, stdout as output } from 'node:process';
import { getArgValue } from './cli/parse.js';
import { getCurrentCommand } from './store/index.js';

//helpers
import { showGreetingMessage } from './utils/helpers.js';

const rl = readline.createInterface({ input, output });
const AppState = {
  currentDir: homedir(),
  homedir: homedir(),
  prompt: 'fs > ',
};

function start() {
  const username = getArgValue('--username');
  showGreetingMessage(username);

  rl.on('line', inputHandler);
  rl.on('close', () => {
    console.log('Thank you for using File Manager, Username, goodbye!');
  });
}

async function inputHandler(str) {
  // console.log(str);
  try {
    // const command = str.split(' ');
    const [command, ...options] = str.match(/\w+/g);
    const currentCommand = getCurrentCommand(command);
    // console.log('curr: ', currentCommand);

    const result = await currentCommand(AppState, ...options);
    // dispatch({eventName: '', })

    console.log(result);
  } catch (e) {
    // rl.prompt('Opertion failed');
    console.error(e.message);
    // rl.close();
  } finally {
    console.log(`You are currently in ${config.currentDir}`);

    rl.prompt();
  }
}
start();

// You are currently in path_to_working_directory
