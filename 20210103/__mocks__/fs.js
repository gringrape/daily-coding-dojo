const existsSync = jest.fn();

const mkdirSync = jest.fn();

const readFileSync = jest.fn(() => '{"scripts":{"test": ""}}');

const writeFileSync = jest.fn();

module.exports = {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
};
