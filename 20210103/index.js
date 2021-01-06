const { execSync, exec } = require('child_process');
const {
  mkdirSync, existsSync, readFileSync, writeFileSync,
} = require('fs');

function getDate() {
  const date = new Date().toISOString().slice(0, 10);
  return [...date].map((char) => ((char === '-') ? '' : char)).join('');
}

const consoleLog = (error, stdout) => {
  console.log(stdout);
};

function init(date = getDate(), consoleLogFn = consoleLog) {
  if (!existsSync(date)) {
    mkdirSync(date);
  }

  execSync('npm init -y', { cwd: date }, consoleLogFn);
  exec('npm i jest @types/jest', { cwd: date }, consoleLogFn);

  const packageJsonText = readFileSync(`${date}/package.json`, 'utf-8');
  const obj = JSON.parse(packageJsonText);
  obj.scripts.test = 'jest';

  writeFileSync(`${date}/package.json`, JSON.stringify(obj));

  exec('npm test -- --watchAll', { cwd: date }, consoleLogFn);
}

init();

module.exports = {
  init,
};
