const { execSync, exec } = require('child_process');
const {
  mkdirSync, existsSync, readFileSync, writeFileSync,
} = require('fs');

function getDate() {
  const date = new Date().toISOString().slice(0, 10);
  return [...date].map((char) => ((char === '-') ? '' : char)).join('');
}

function init(date = getDate()) {
  if (!existsSync(date)) {
    mkdirSync(date);
  }

  execSync('npm init -y', { cwd: date });
  exec('npm i jest @types/jest', { cwd: date });

  const packageJsonText = readFileSync(`${date}/package.json`, 'utf-8');
  const obj = JSON.parse(packageJsonText);
  obj.scripts.test = 'jest';

  writeFileSync(`${date}/package.json`, JSON.stringify(obj));

  exec('npm test -- --watchAll', { cwd: date });
}

init();

module.exports = {
  init,
};
