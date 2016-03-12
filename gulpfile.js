var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
	return browserify({entries: './src/app.js', extensions: ['.jsx', '.js'], debug: true})
		.transform(babelify, {presets: ['es2015', 'stage-0', 'react']})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('public'));
});

gulp.task('watch', ['build'], function () {
	gulp.watch('src/*.*', ['build']);
});

gulp.task('default', ['watch']);