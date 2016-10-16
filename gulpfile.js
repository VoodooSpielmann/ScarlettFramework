var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

gulp.task('sass',function(){
  return gulp.src('scss/*.scss')
   .pipe(sass())
   .pipe(autoprefixer({browsers:['last 2 versions','>5%','ie 9']}))
   .pipe(gulp.dest('./css/'));
});

gulp.task('images',function(){
  return gulp.src('img/**/*')
   .pipe(gulp.dest('dist/img'));
});

gulp.task('watch',function(){
  gulp.watch('scss/*.scss',['sass']);
});

gulp.task('build',['images'],function(){
  return gulp.src('*.html')
   .pipe(useref())
   .pipe(gulpif('*.js',uglify()))
   .pipe(gulpif('*.css',cleancss()))
   .pipe(gulp.dest('dist'));
});

gulp.task('default',['sass','watch']);