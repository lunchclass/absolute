var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
  return gulp.src(['../client/**/*.{js,jsx}','**/*.{js,jsx}','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  gulp.watch(['**/*.{js,jsx}','../client/**/*.{js,jsx}','!node_modules/**'], ['lint']);
});

gulp.task('default', ['watch'], function () {
});

