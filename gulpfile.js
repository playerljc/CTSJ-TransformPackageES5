const path = require('path');
const gulp = require('gulp');

const commandArgs = require('./src/commandArgs');

const argsMap = commandArgs.initCommandArgs();
const outputpath = argsMap.get('--outputpath')[0];
const compilePath = argsMap.get('--compilepath')[0];

const copyexts = [
  'md',
  'html',
  'less',
  'sass',
  'css',
  'svg',
  'jpg',
  'jpeg',
  'gif',
  'png',
  'bmp',
  'json',
  'eot',
  'woff',
  'ttf',
  'xml',
  'yml',
  'yaml',
  'mp4',
  'avi',
  'mp3',
  'rmvb',
  'ico',
  'map',
  'woff2',
  'txt',
];

/**
 * copy
 */
gulp.task('copy', () => {
  const srcs = copyexts.map((ext) => path.join(compilePath, '**', `*.${ext}`));
  return gulp.src(srcs).pipe(gulp.dest(outputpath));
});

gulp.task('default', gulp.series('copy'));
