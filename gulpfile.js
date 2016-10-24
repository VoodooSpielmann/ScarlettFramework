var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var strip = require('gulp-strip-comments');
var uncss = require('gulp-uncss');
var uncssOptions = {
  html:['index.html'],
  ignore:[/active/],
  media:['(max-width: 870px)','(max-width: 600px)','(max-width: 480px)']
};

gulp.task('sass',function(){
  return gulp.src('scss/*.scss')
   .pipe(sass())
   .pipe(autoprefixer({browsers:['last 2 versions','>5%','ie 9']}))
   .pipe(uncss(uncssOptions))
   .pipe(gulp.dest('./css/'));
});

gulp.task('images',function(){
  return gulp.src('img/**/*')
   .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts',function(){
  return gulp.src('fonts/**/*')
   .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch',function(){
  gulp.watch('scss/*.scss',['sass']);
});

gulp.task('build',['images','fonts'],function(){
  return gulp.src('*.html')
   .pipe(useref())
   .pipe(gulpif('*.js',uglify()))
   .pipe(gulpif('*.css',cleancss(),strip({trim:true})))
   .pipe(gulp.dest('dist'));
});

gulp.task('default',['sass','watch']);