import os from 'os';
import { InputError } from '../utils/errors.js';
import { validateArguments } from '../utils/helpers.js';

export const getOsInfo = (args) => {
  validateArguments(args, {
    size: 1,
  });
  const command = normalizeParam(args[0]);

  const commandsObj = {
    EOL: () => JSON.stringify(os.EOL),
    homedir: () => os.homedir(),
    arch: () => os.arch(),
    username: () => {
      const { username } = os.userInfo();
      return username;
    },
    homedir: () => {
      const { homedir } = os.userInfo();
      return homedir;
    },
    cpus: () => {
      const cores = os.cpus();
      // amount of CPUS
      // model and clock rate (in GHz) for each of them
      const result = {
        'Amount of CPUS': cores.length,
      };
      cores.forEach((core, idx) => {
        result[`core ${idx}`] = {
          model: core.model,
          speed: core.speed + ' GHz',
        };
      });

      return result;
    },
  };
  if (!(command in commandsObj)) {
    throw new InputError();
  }
  const osInfo = commandsObj[command];
  const info = osInfo();
  // return result;
  console.log(info);
};

function normalizeParam(str) {
  if (!str.startsWith('--')) {
    throw new InputError();
  }

  const param = str.replace(/--(\w+)/, (_, command) =>
    command === 'architecture' ? 'arch' : command,
  );

  return param;
}

// console.log(getOsInfo('homedir'));
