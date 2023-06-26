import fs from 'fs';

import { Readable } from 'stream';
const filPath = 'text.txt';

// fs.watchFile(filPath, 'utf-8', () => {
//   console.log('changed');
// });
const rrr = fs.promises.readFile('text.txt').then(console.log);

// const rrr = new Readable.from(['RSSchool', 'NodeJS', 'Course']);
// rrr.on('data', (c) => console.log(c));
console.log(rrr);
