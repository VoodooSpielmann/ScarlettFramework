var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var strip = require('gulp-strip-comments');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var uncss = require('gulp-uncss');
var uncssOptions = {
  html:['index.html'],
  ignore:[/active/,/animated/,/slick/],
  media:['(max-width: 870px)','(max-width: 600px)','(max-width: 480px)']
};

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('*.html')
  .pipe(connect.reload());
});

gulp.task('sass',function(){
  return gulp.src('scss/*.scss')
   .pipe(sass())
   .pipe(autoprefixer({browsers:['last 2 versions','>5%','ie 9']}))
   .pipe(gulp.dest('./css/'))
   .pipe(connect.reload());
});

gulp.task('images',function(){
  return gulp.src('img/**/*')
   .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts',function(){
  return gulp.src(['fonts/**/*','!fonts/*.css'])
   .pipe(gulp.dest('dist/fonts'));
});

gulp.task('slider',function(){
  return gulp.src(['js/slick/**/*','!js/slick/*.js','!js/slick/*.css'])
   .pipe(gulp.dest('dist/css'));
});

gulp.task('watch',function(){
  gulp.watch('scss/*.scss',['sass']);
  gulp.watch('*.html',['html']);
});

gulp.task('uncss',function(){
  return gulp.src('css/*.css')
   .pipe(uncss(uncssOptions))
   .pipe(gulp.dest('css/'));
});

gulp.task('build',['uncss','images','fonts','slider'],function(){
  return gulp.src('*.html')
   .pipe(useref())
   .pipe(gulpif('*.js',uglify()))
   .pipe(gulpif('*.css',cleancss(),strip({trim:true})))
   .pipe(gulp.dest('dist'));
});

gulp.task('default',['connect','html','sass','watch']);
