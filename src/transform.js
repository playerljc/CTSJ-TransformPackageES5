const path = require('path');
const { spawn } = require('child_process');
const { getEnv, isWin32 } = require('./util');

// 运行脚本的路径
const runtimePath = process.cwd();

// 脚本所在的路径
const codePath = __dirname;

const commandPath = path.join(codePath, '../', 'node_modules', '.bin', path.sep);

// 输入路径
let compilePath;

// 输出路径
let outputPath;

let index = 0;

// buildpackage的所有任务
const tasks = [
  // 清除生成目录
  clearTask,
  // babel转换，转换js
  babelTask,
  // 样式
  gulpTask,
];

/**
 * clearTask
 * 清除输出目录
 * @return {Promise}
 */
function clearTask() {
  return new Promise((resolve) => {
    const command = isWin32() ? `rimraf.cmd` : `rimraf`;

    const rimrafProcess = spawn(command, [outputPath], {
      cwd: path.join(codePath, '../'),
      encoding: 'utf-8',
      env: getEnv(commandPath),
    });

    rimrafProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    rimrafProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    rimrafProcess.on('close', (code) => {
      console.log(`rimrafClose：${code}`);
      resolve();
    });
  });
}

/**
 * babelTask
 * 转换src到lib
 * @return {Promise}
 */
function babelTask() {
  return new Promise((resolve) => {
    const command = isWin32() ? `babel.cmd` : `babel`;

    const babelProcess = spawn(
      command,
      [
        // 编译的目录
        compilePath,
        '-d',
        // 输出的目录
        outputPath,
        '--minified',
        '-s',
        'true',
        '--no-comments',
      ],
      {
        cwd: path.join(codePath, '../'),
        encoding: 'utf-8',
        env: getEnv(commandPath),
      },
    );

    babelProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    babelProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    babelProcess.on('close', (code) => {
      console.log(`babelClose：${code}`);
      resolve();
    });
  });
}

/**
 * gulpTask
 * @return {Promise}
 */
function gulpTask() {
  return new Promise((resolve) => {
    const command = isWin32() ? `gulp.cmd` : `gulp`;

    const gulpProcess = spawn(
      command,
      [
        '--outputpath',
        // 输出路径
        path.join(outputPath, path.sep),
        '--compilepath',
        // 编译目录
        path.join(compilePath, path.sep),
      ],
      {
        cwd: path.join(codePath, '../'),
        encoding: 'utf-8',
        env: getEnv(commandPath),
      },
    );

    gulpProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    gulpProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    gulpProcess.on('close', (code) => {
      console.log(`gulpTaskClose：${code}`);
      resolve();
    });
  });
}

/**
 * loopTask
 * @return {Promise}
 */
function loopTask() {
  return new Promise((resolve, reject) => {
    if (index >= tasks.length) {
      resolve();
    } else {
      const task = tasks[index++];
      if (task) {
        task()
          .then(() => {
            loopTask().then(() => {
              resolve();
            });
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject();
      }
    }
  });
}

module.exports = function ({ srcpath = 'src', output = 'dist' }) {
  // 是绝对路径
  if (path.isAbsolute(srcpath)) {
    compilePath = srcpath;
  }
  // 是相对路径(程序运行目录/srcPath)
  else {
    compilePath = path.join(runtimePath, srcpath);
  }

  // 是绝对路径
  if (path.isAbsolute(output)) {
    outputPath = output;
  }
  // 是相对路径(程序运行目录/srcPath)
  else {
    outputPath = path.join(runtimePath, output);
  }

  loopTask()
    .then(() => {
      console.log('finish');
      process.exit();
    })
    .catch((error) => {
      console.log(error);
    });
};
