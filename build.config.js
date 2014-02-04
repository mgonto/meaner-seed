/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    // required for source maps to work
    server: 'http://localhost:3000',
    // this dir contains compiled assets for both dev and prod mode
    compile_dir: 'assets',
    src_dir: 'frontend',
    views_dir: 'app/views',
    templates_file: '<%= compile_dir %>/templates.js',
    less_compiled: '<%= compile_dir %>/less.css',
    less_compiled_na: '<%= compile_dir %>/less_na.css',

    css_dir: '<%= compile_dir %>/styles',
    lib_dir: '<%= compile_dir %>/vendor',

    test_files: {
        js: [
            '<%= lib_dir %>/angular-mocks/angular-mocks.js',
        ]
    },

    // all paths should point to compile dir
    // We can control CSS inclusion order / exclude some files:
    // First included files in 'css_first' (in order defined)
    // Next included files from 'css' (in alphabetical order)
    // All files listed in 'css_exclude' are not included
    
    // 'css_non_angular' are files which are the only css included for non-angular pages
    app_files: {
        tests: '<%= compile_dir %>/app/**/*.spec.js',
        js: [
            '<%= compile_dir %>/app/**/*.js',
            '!<%= app_files.tests %>'
        ],

        less_angular: [
            '<%= css_dir %>/shared/**/*.less',
            '<%= compile_dir %>/app/**/*.less'
        ],

        less_non_angular: [
            '<%= css_dir %>/**/*.less'
        ],

        tpl: ['<%= compile_dir %>/app/**/*.tpl.html']
    },

    app_template: 'app/views/includes/scripts.tpl.html',

    vendor_files: {
        // these should be with prefix to preserve order
        js_vendor_all: [
            '<%= lib_dir %>/jquery/jquery.js',
            '<%= lib_dir %>/lodash/dist/lodash.js'
        ],

        js_vendor_angular: [
            '<%= lib_dir %>/angular/angular.js',
            '<%= lib_dir %>/angular-ui-router/release/angular-ui-router.js',
            '<%= lib_dir %>/angular-ui-utils/ui-utils.js',
            '<%= lib_dir %>/restangular/dist/restangular.js'    
        ],

        js_vendor_non_angular: [
            '<%= lib_dir %>/bootstrap/dist/bootstrap.js'
        ],

        css_vendor_all: [
            '<%= lib_dir %>/bootstrap/dist/css/bootstrap.css'
        ],

        css_vendor_angular: [

        ],

        css_vendor_non_angular: [

        ],
        // note that there should be at least 2 elements in array to expansion work
        js_exclude: [
            '<%= lib_dir %>/angular-mocks/angular-mocks.js',
            ''
        ],

        js: [
            '<%= vendor_files.js_vendor_all %>',
             '<%= vendor_files.js_vendor_angular %>',
             '!{<%= vendor_files.js_exclude %>}'
        ],

        js_non_angular: [
            '<%= vendor_files.js_vendor_all %>',
             '<%= vendor_files.js_vendor_non_angular %>',
             '!{<%= vendor_files.js_exclude %>}'
        ],

        css: [
            '<%= vendor_files.css_vendor_all %>',
             '<%= vendor_files.css_vendor_angular %>'
        ],

        css_non_angular: [
             '<%= vendor_files.css_vendor_all %>',
             '<%= vendor_files.css_vendor_non_angular %>'
        ]
    }

};