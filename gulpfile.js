/**
 * Created by RSC on 03.01.2016.
 */

(function () {
    'use strict';
    var gulp = require('gulp'),
        concat = require('gulp-concat'),
        jshint = require('gulp-jshint');

    gulp.task('fonts', function () {
        gulp.src('bower_components/font-awesome/fonts/**/*')
            .pipe(gulp.dest('dist/fonts'));
    });

    gulp.task('views', function () {
        gulp.src(['views/**/*.js', '!views/**/*.spec.js'])
            .pipe(concat('views.js'))
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('services', function () {
        gulp.src('js/services/**/*.js')
            .pipe(concat('services.js'))
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('module', function () {
        gulp.src('js/module/**/*.js')
            .pipe(concat('module.js'))
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('provider', function () {
        gulp.src('js/provider/**/*.js')
            .pipe(concat('provider.js'))
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('directives', function () {
        gulp.src('js/directives/**/*.js')
            .pipe(concat('directives.js'))
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('filters', function () {
        gulp.src('js/filters/**/*.js')
            .pipe(concat('filters.js'))
            .pipe(gulp.dest('dist/js'));
    });


    gulp.task('css', function () {
        gulp.src('css/**/*.css')
            .pipe(concat('style.css'))
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('watch', function () {
        gulp.watch('views/**/*.js', ['views']);
        gulp.watch('js/services/**/*.js', ['services']);
        gulp.watch('js/directives/**/*.js', ['directives']);
        gulp.watch('js/filters/**/*.js', ['filters']);
        gulp.watch('css/**/*.css', ['css']);
    });


    gulp.task('dist-files', function () {
        gulp.src(['views/**/*.js', '!views/**/*.spec.js'])
            .pipe(concat('views.js'))
            .pipe(gulp.dest('dist/js'));
        gulp.src('js/services/**/*.js')
            .pipe(concat('services.js'))
            .pipe(gulp.dest('dist/js'));
        gulp.src('js/directives/**/*.js')
            .pipe(concat('directives.js'))
            .pipe(gulp.dest('dist/js'));
        gulp.src('js/filters/**/*.js')
            .pipe(concat('filters.js'))
            .pipe(gulp.dest('dist/js'));
        gulp.src('js/**/*')
            .pipe(gulp.dest('dist/js'));
        gulp.src('css/**/*')
            .pipe(gulp.dest('dist/css'));
        gulp.src('templates/**/*')
            .pipe(gulp.dest('dist/templates'));
        gulp.src('images/**/*')
            .pipe(gulp.dest('dist/images'));
        gulp.src('views/**/*.html')
            .pipe(gulp.dest('dist/views'));
        gulp.src('css/**/*.css')
            .pipe(gulp.dest('dist/css'));            
        gulp.src(['bower.json', 'index.html', 'gulpfile.js', 'server.js'])
            .pipe(gulp.dest('dist'));
        gulp.src('bower_components/font-awesome/fonts/**/*')
            .pipe(gulp.dest('dist/fonts'));
    });

    gulp.task('dev', [
        'fonts',
        'views',
        'services',
        'filters',
        'directives',
        'css',
        'watch'
    ]);

    gulp.task('prepareTests', [
        'fonts',
        'views',
        'services',
        'filters',
        'directives',
        'css'
    ]);

    gulp.task('dist', [
        'dist-files'
    ]);
}());

