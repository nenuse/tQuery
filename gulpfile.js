'use strict'

const gulp = require('gulp')
const JSMIN = require('gulp-uglify-es').default
const rename = require('gulp-rename')

// JavaScript
function js(){
  return gulp.src('./tQuery.js')
    .pipe(JSMIN())
    .pipe(rename('./tQuery.min.js'))
    .pipe(gulp.dest('./'))
}

gulp.task('default', js)
