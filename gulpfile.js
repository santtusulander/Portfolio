var gulp = require('gulp')
var fs = require("fs")
var browserify = require("browserify")
var babelify = require("babelify")
var path = require('path');
var watchify   = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var sync   = require('browser-sync');
var args = require('minimist')(process.argv);
var envify     = require('envify');

var mode = args['test-runner-mode'] === 'watch' ? 'watch' : 'run';

// We need to setup browserify. For regular builds we use 'browserify' by
// itself, but for builds that keep repeating, we use 'watchify'. Note that we
// set the 'debug' flag in order to preserve sourcemaps.
watchify.args           = watchify.args || { }
watchify.args.debug     = process.env.NODE_ENV !== 'production';
watchify.args.fullPaths = process.env.NODE_ENV !== 'production';

var entry   = path.join(__dirname, 'routes/routes.js');
var bundler = browserify(entry, watchify.args);

if(args['use-watchify']) {
	bundler = watchify(bundler);
}
bundler = bundler.transform(envify).transform(babelify);

gulp.task('build',function(){
 	var stream = bundler.bundle().pipe(source('app.js'));

		stream = stream.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write());

	stream = stream.pipe(gulp.dest('dist'));

			if(args['use-browser-sync']) {
		stream = stream.pipe(sync.reload({ stream: true, once: true }));
	}

	return stream;
});