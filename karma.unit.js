// Karma configuration
// Generated on Fri Aug 09 2013 14:14:35 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
      'assets/vendor/jquery/jquery.js',
      'assets/vendor/lodash/dist/lodash.js',
      'assets/vendor/angular/angular.js',
      'assets/vendor/angular-ui-router/release/angular-ui-router.js',
      'assets/vendor/angular-ui-utils/ui-utils.js',
      'assets/vendor/restangular/dist/restangular.js',
      'assets/templates.js',
      'assets/vendor/angular-mocks/angular-mocks.js',
      'assets/app/app.js',
      'assets/app/home/home.js',
      'assets/app/app.spec.js',
      'assets/app/home/home.spec.js',

    ],


    // list of files to exclude
    exclude: [

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // cli runner port
    runnerPort: 9100,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false

  });
};