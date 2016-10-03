var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
		rename = require('gulp-rename');

var config = {
		mode: {
			css: {
				sprite: 'sprite.svg',
				render: {
					css: {
						template: './gulp/templates/sprite.css'
					}
				}
			}
		}
}

gulp.task('createSprite', function() {
	return gulp.src('./app/assets/images/icons/**/*.svg')
	.pipe(svgSprite(config))
	.pipe(gulp.dest('./app/assets/images/icons/sprites/'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
	return gulp.src('./app/assets/images/icons/sprites/css/*.css')
	.pipe(rename('_sprite.css'))
	.pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('icons', ['copySpriteCSS']);
