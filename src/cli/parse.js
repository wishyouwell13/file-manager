// export const parseArgs = () => {
//   const args = process.argv.slice(2);
//   const parsedArgs = [];

//   for (let i = 0; i < args.length; i += 2) {
//     const [prop, value] = [args[i], args[i + 1]];
//     const str = `${prop.replace(/-/g, '')} is ${value}`;
//     parsedArgs.push(str);
//   }
//   console.log(parsedArgs.join(', '));
// };

export const getArgValue = (target) => {
  const { argv } = process;

  return argv
    .find((arg) => arg.startsWith(target))
    .split('=')
    .pop();
};

// parseArgs();
