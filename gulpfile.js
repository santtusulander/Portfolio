var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require("browserify");
var babelify = require("babelify");
var path = require('path');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');


var entry   = path.join(__dirname, './routes.js');
var bundler = browserify(entry);

bundler = bundler.transform(babelify);

function bundle(){
 	var stream = bundler.bundle().pipe(source('app.js'));

		stream = stream.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write());

	stream = stream.pipe(gulp.dest('dist'));
	return stream;
}

gulp.task('build-js', bundle);

gulp.task('build-css', function () {
  return gulp.src('./styles/app.scss')
    .pipe(sass({
    	includePaths: require('node-bourbon').with('dist'),
    	indentedSyntax: true,
    	errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build-css', 'build-js']);