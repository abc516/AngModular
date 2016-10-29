/**
 * Created by anton on 10/29/16.
 */
var gulp = require('gulp');
var plug = require('gulp-load-plugins')();

console.log(JSON.stringify(plug))

var source = [
    './client/app/**/*module*.js',
    './client/app/**/*.js',
    '!./client/app/**/{,/*-spaghetti.js}'
];

gulp.task('ngAnnotateTest', function () {
    return gulp
        .src(source)
        .pipe(plug.ngAnnotate({add: true, single_quotes: true}))
        .pipe(plug.rename(function (path) {
            path.extname = '.annotated.js';
        }))
        .pipe(plug.uglify({mangle: true}))
        .pipe(gulp.dest('./build'))
});

gulp.task('hint', function(){
    return gulp
        .src(source)
        .pipe(plug.jshint('./.jshintrc'))
        .pipe(plug.jshint.reporter('jshint-stylish'))
});

gulp.task('watch', function () {
    return gulp
        .watch(source, ['hint'])
        .on('change', function (event) {
            console.log('*** File ' +event.path + ' was ' + event.type)
        })
})