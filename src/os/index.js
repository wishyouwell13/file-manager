import os from 'os';

export const getOsInfo = (arg) => {
  const commandsObj = {
    EOL: () => os.EOL,
    homedir: () => os.homedir(),
    architecture: () => os.arch(),
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
      const result = {
        'amount of CPUS': cores.length,
      };
      // amount of CPUS
      // model and clock rate (in GHz) for each of them
      cores.forEach((core, idx) => {
        result[`core ${idx}`] = {
          model: core.model,
          speed: core.speed + ' GHz',
        };
      });

      return result;
    },
  };
  const osInfo = commandsObj[arg];
  return osInfo();
};
// function normalizeParam(str) {
//   const param = str.replace(/--(\w+)/, (_, command) =>
//     command === 'architecture' ? 'arch' : command,
//   );

//   return param;
// }

// console.log(getOsInfo('homedir'));
