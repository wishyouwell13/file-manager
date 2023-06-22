import os from 'os';

export const getOsInfo = (param) => {
  param = normalizeParam(param);
  if (param in os) {
    const res = typeof os[param] === 'function' ? os[param]() : os[param];
  } else {
    throw new Error();
  }
};
function normalizeParam(str) {
  const param = str.replace(/--(\w+)/, (_, command) =>
    command === 'architecture' ? 'arch' : command,
  );

  return param;
}
