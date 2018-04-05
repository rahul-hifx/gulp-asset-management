var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rev = require('gulp-rev'),
	minify = require('gulp-minify'),
	cleanCss = require('gulp-clean-css')
	del = require('del');

gulp.task('pack-js', ['clean-scripts'], function () {
   	return gulp.src('js/**/*.js')
   		.pipe(minify({noSource: true}))
   		.pipe(rev())
        .pipe(gulp.dest('build/js'))
        .pipe(rev.manifest('build/asset-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest(''));
});

gulp.task('pack-css', ['clean-css'], function () {
   	return gulp.src('css/**/*.css')
   		.pipe(cleanCss())
        .pipe(rev())
        .pipe(gulp.dest('build/css'))
        .pipe(rev.manifest('build/asset-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest(''));
});

gulp.task('clean-scripts', function () {
	return del([
		'build/js/*.js'
	]);
});
 
gulp.task('clean-css', function () {
	return del([
		'build/css/*.css'
	]);
});

gulp.task('watch', function() {
	gulp.watch('js/**/*.js', ['pack-js']);
	gulp.watch('css/**/*.css', ['pack-css']);
});


gulp.task('default', ['watch']);
gulp.task('pack', ['pack-js','pack-css']);