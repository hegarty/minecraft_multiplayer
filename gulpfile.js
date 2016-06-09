var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var less = require('gulp-less');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
//var shell = require('gulp-shell');

process.env.NODE_ENV = 'dev-terence';

var sass_input = './public/assets/sass/**/*.scss';
var sass_output = './public/assets/css';

gulp.task('sass', function () {
  return gulp
    .src(sass_input)
    .pipe(sass())
    .pipe(gulp.dest(sass_output));
});


gulp.task('clean-bundle', function () {
  return gulp.src('./public/j/bundle.js', {read: false})
    .pipe(clean());
});

gulp.task('browserify',['clean-bundle'],function() {
  return browserify('./client.js')
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    //.pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('./public/j/'));
});

gulp.task('nodemon', function () 
{
	nodemon(
	{
    		script: './bootstrap.js',
  		ext: 'js html ejs',
  		ignore: ['public/','main.js','gulpfile.js'],
		//delay:5,
	}).on('restart', function() 
	{
		gulp.start('browserify');
    	});
});

gulp.task('watch', function() {
  	gulp.watch('./public/j/*', ['browserify']);
	gulp.watch(sass_input, ['sass']);
});
gulp.task('default', ['nodemon','watch']);
