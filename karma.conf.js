// Karma configuration for TC

    module.exports = function(config) {
        config.set({

            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '',


            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['jasmine'],


            // list of files / patterns to load in the browser
            // you might need to add frameworks, for example:
            // 'knockout.js',
            // 'jquery.min.js',
            files: [
                'bower_components/jquery/dist/jquery.min.js',
                'bower_components/angular/angular.min.js',
                'bower_components/angular-resource/angular-resource.min.js',
                'bower_components/angular-sanitize/angular-sanitize.min.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                'bower_components/angular-bootstrap/ui-bootstrap.min.js',
                'bower_components/moment/min/moment.min.js',
                'bower_components/amcharts/dist/**/*.min.js',
                'bower_components/covis-angular-devkit/**/*.js',
                'bower_components/covis-stylerepository/**/*.js',
                'bower_components/eonasdan-bootstrap-datetimepicker/build/js/**/*.min.js',
                'bower_components/ngprogress-lite/ngprogress-lite.min.js',
                'bower_components/respond/dest/respond.min.js',
                'bower_components/toastr/toastr.min.js',
                'bower_components/angular-ui-utils/ui-utils.js',
                'bower_components/angular-ui-select/dist/select.js',
                'bower_components/angular-virtual-scroll/angular-virtual-scroll.js',
                'js/app.js',
                'js/directives.js',
                'js/services.js',
                'js/views.js',
                '*.js',
                'js/**/*.spec.js',
                'views/**/*.spec.js'
            ],


            // list of files to exclude
            exclude: [
                'gulpfile.js',
                'server.js',
                'bower_components/bootstrap/**/*.js',
                '**/Gruntfile.js'
            ],

            // list of plugins to load
            plugins: [
                'karma-jasmine',
                'karma-coverage',
                'karma-phantomjs-launcher',
                'karma-teamcity-reporter'
            ],


            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {
                '*.js': ['coverage'],
                'js/**/*.js': ['coverage']
            },


            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: ['progress', 'teamcity', 'coverage'],

            coverageReporter : {
                type: 'html',
                dir: 'coverage/'
            },


            // web server port
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            colors: true,


            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,


            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,


            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            // or you can just use 'chrome'
            browsers: ['PhantomJS'],


            // Continuous Integration mode
            singleRun: true
        });
    };