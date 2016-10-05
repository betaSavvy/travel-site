var gulp = require('gulp'),
		del = require('del'),
    imagemin = require('gulp-imagemin'),
		usemin = require('gulp-usemin'),
		rev = require('gulp-rev'),
		cssnano = require('gulp-cssnano'),
		uglify = require('gulp-uglify'),
		browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
	browserSync.init({
        notify: false,
        server: {
            baseDir: 'docs'
        }
    });
});

gulp.task('deleteDistFolder', ['icons'], function() {
		return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	var pathsToCopy = [
	'./app/**/*',
	'!./app/index.html',
	'!./app/assets',
	'!./app/assets/**',
	'!./app/temp',
	'!./app/temp/**'
];
	return gulp.src(pathsToCopy)
	.pipe(gulp.dest('./docs'))
});

gulp.task('optimizeImages', ['copyGeneralFiles'], function() {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('copySvgPng', ['optimizeImages'], function() {
	return gulp.src('./app/assets/images/icons/sprites/*.{svg,png}')
	.pipe(gulp.dest('./docs/assets/images/icons/sprites'));
});

gulp.task('usemin', ['copySvgPng', 'styles', 'scripts'], function() {
	return gulp.src('./app/index.html')
	.pipe(usemin({
		css: [function() {return rev()}, function() {return cssnano()}],
		js: [function() {return rev()}, function() {return uglify()}]
	}))
	.pipe(gulp.dest('./docs'));
});

gulp.task('build', ['usemin']);
