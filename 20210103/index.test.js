const { exec, execSync } = require('child_process');
const {
  mkdirSync, existsSync, readFileSync, writeFileSync,
} = require('fs');

const { init } = require('.');

jest.mock('fs');
jest.mock('child_process');

describe('init', () => {
  const consoleLogFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('make folder if not exist', () => {
    existsSync.mockReturnValue(false);

    init('20210101');

    expect(mkdirSync).toBeCalledWith('20210101');
  });

  it('doesnt make folder if exist', () => {
    existsSync.mockReturnValue(true);

    init();

    expect(mkdirSync).not.toBeCalled();
  });

  it('start project', () => {
    init('20210101', consoleLogFn);

    expect(execSync).toHaveBeenNthCalledWith(1, 'npm init -y', { cwd: '20210101' }, consoleLogFn);
  });

  it('install jest and types', () => {
    init('20210101', consoleLogFn);

    expect(exec).toHaveBeenNthCalledWith(1, 'npm i jest @types/jest', { cwd: '20210101' }, consoleLogFn);
  });

  it('read package.json', () => {
    init('20210101');

    expect(readFileSync).toBeCalled();
  });

  it('write package.json', () => {
    init('20210101');

    expect(writeFileSync).toBeCalled();
  });

  it('read package.json', () => {
    init('20210101', consoleLogFn);

    expect(exec).toHaveBeenNthCalledWith(2, 'npm test -- --watchAll', { cwd: '20210101' }, consoleLogFn);
  });
});
