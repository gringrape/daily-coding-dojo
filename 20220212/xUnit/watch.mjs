#!/usr/bin/env zx

import fs from 'fs';

console.log('Wathching...')

fs.watchFile('./main.py', async () => {
  console.log('File changed!')
  await $`python3 main.py`
});
