'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-este-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-css-url-replace');
    grunt.loadNpmTasks('grunt-contrib-less');

    var userConfig = require('./build.config.js');

    // we should ensure that timestamp is the same for all files, so process template only once
    // TODO switch to md5 instead, ALPHA-2870
    var ts = grunt.template.process('<%= grunt.template.today("yyyymmddHHmmss") %>');

    // Project configuration.
    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        // cleanup target dir
        clean: {
            build: [ '<%= compile_dir %>' ],
            release: [
                '<%= compile_dir %>/app',
                '<%= compile_dir %>/vendor',
                '<%= templates_file %>',
                '<%= less_compiled %>',
                '<%= less_index.index.dest %>'
                // TODO clean stylesheets as well, ALPHA-2869
            ]
        },

        // copy all frontend to target dir for further work
        copy: {
            frontend: {
                expand: true,
                cwd: '<%= src_dir %>/',
                src: '**/*',
                dest: '<%= compile_dir %>/'
            }
        },

        // build less index
        less_index: {
            index: {
                src: '<%= app_files.less_angular %>',
                dest: '<%= compile_dir %>/index.less'
            },
            index_non_angular: {
                src: '<%= app_files.less_non_angular %>',
                dest: '<%= compile_dir %>/index-na.less'
            },
        },

        // compile less, for production also concat & minify css
        less: {
            build: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: '<%= less_compiled %>.map',
                    sourceMapRootpath: '<%= server %>'
                },
                src: '<%= less_index.index.dest %>',
                dest: '<%= less_compiled %>'
            },
            build_non_angular: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: '<%= less_compiled_na %>.map',
                    sourceMapRootpath: '<%= server %>'
                },
                src: '<%= less_index.index_non_angular.dest %>',
                dest: '<%= less_compiled_na %>'
            },
            dist: {
                options: {
                    cleancss: true
                },
                src: [
                    '<%= vendor_files.css %>',
                    '<%= less_index.index.dest %>'
                ],
                dest: '<%= compile_dir %>/<%= pkg.name %>-' + ts + '.css'
            },
            dist_non_angular: {
                options: {
                    cleancss: true
                },
                src: [
                    '<%= vendor_files.css_non_angular %>',
                    '<%= less_index.index_non_angular.dest %>'
                ],
                dest: '<%= compile_dir %>/<%= pkg.name %>-na-' + ts + '.css'
            }
        },

        // compiles Angular tempates to cached templates.js file, so no HTTP requests for templates neeeded
        // it is needed to add 'templates-app' dependency to Angular application to use this
        html2js: {
            app: {
                options: {
                    base: 'assets'
                },
                src: '<%= app_files.tpl %>',
                dest: '<%= templates_file %>'
            }
        },

        // compile includes.tmp.html to include all needed assets, compiled file is includes.html
        index: {
            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            build: {
                options: {
                    livereload: true
                },
                files: [{
                    src: [
                        '<%= vendor_files.js %>',
                        '<%= app_files.js %>',
                        '<%= templates_file %>',
                        '<%= vendor_files.css %>',
                        '<%= less_compiled %>'
                    ]
                }, {
                    options: {
                        non_angular: true
                    },
                    src: [
                        '<%= vendor_files.js_non_angular %>',
                        '<%= vendor_files.css_non_angular %>',
                        '<%= less_compiled_na %>'
                    ]
                }]
            },

            /**
             * When it is time to have a completely compiled application, we can
             * alter the above to include only a single JavaScript and a single CSS
             * file. Now we're back!
             */
            compile: {
                files: [{
                    src: [
                        '<%= concat.lib.dest %>',
                        '<%= concat.js.dest %>',
                        '<%= less.dist.dest %>'
                    ]
                }, {
                    options: {
                        non_angular: true
                    },
                    src: [
                        '<%= less.dist_non_angular.dest %>',
                        '<%= concat.lib_non_angular.dest %>'
                    ]
                }]

            }
        },

        // 'ng-min' annotates the sources before minifying. That allows us to code without the array syntax.
        ngmin: {
            compile: {
                expand: true,
                src: '<%= app_files.js %>'
            }
        },

        // rewrite image path in CSS to absolute path
        // TODO better url replace ( instead of /stylesheets/ use /css which will point to /assets/stylesheets), ALPHA-2869
        css_url_replace: {
            dist: {
                options: {
                    staticRoot: 'assets'
                },
                expand: true,
                src: [
                    '<%= vendor_files.css %>',
                    '<%= vendor_files.css_non_angular %>'
                ]
            }
        },

        // concatenate, for JS we strip banners & strict mode of individual files, also adding separators
        // we have to use rename function because Grunt doesn't support 'cwd' without 'expand'
        // and expand generates multiple mappings, so to combine them back to one dest file we use rename
        concat: {
            js: {
                options: {
                    separator: ";\n",
                    stripBanners: true,
                    process: function(src, filepath) {
                        return '// Source: ' + filepath + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
                },
                src: [
                    '<%= app_files.js %>',
                    '<%= templates_file %>'
                ],
                dest: '<%= compile_dir %>/<%= pkg.name %>-' + ts + '.js'
            },
            lib: {
                options: {
                    separator: ";\n",
                    stripBanners: true
                },
                src: '<%= vendor_files.js %>',
                dest: '<%= compile_dir %>/<%= pkg.name %>-libs-' + ts + '.js'
            },
            lib_non_angular: {
                options: {
                    separator: ";\n",
                    stripBanners: true
                },
                src: '<%= vendor_files.js_non_angular %>',
                dest: '<%= compile_dir %>/<%= pkg.name %>-libs-na-' + ts + '.js'
            }
        },

        // Minify the sources
        uglify: {
            compile: {
                files: {
                    '<%= concat.js.dest %>': '<%= concat.js.dest %>',
                    '<%= concat.lib.dest %>': '<%= concat.lib.dest %>',
                    '<%= concat.lib_non_angular.dest %>': '<%= concat.lib_non_angular.dest %>'
                }
            }
        },

        // watch
        esteWatch: {
            options: {
                livereload: {
                    enabled: true,
                    port: 35728,
                    extensions: ['js', 'css', 'html', 'less']
                },
                dirs: [
                    '<%= src_dir %>/app/**/',
                    '<%= css_dir %>/**/'
                ]
            },
            '*': function() { return ['build'] }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['assets/**'],
                    watchedExtensions: ['js'],
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'esteWatch'],
            options: {
                logConcurrentOutput: true
            }
        },

        karmaconfig: {
            unit: {
                src: [
                    '<%= vendor_files.js %>',
                    '<%= templates_file %>',
                    '<%= test_files.js %>',
                    '<%= app_files.js %>',
                    '<%= app_files.tests %>'
                ]
            }
        },

        karma: {
            unit: {
              singleRun: true,
              autoWatch: false,
              configFile: 'karma.unit.js'
            },
            "unit-ci": {
              singleRun: true,
              autoWatch: false,
              configFile: 'karma.unit.js'
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
    }

    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    // Default task.
    grunt.registerTask('default', ['watch']);

    // Build task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'build', 'karmaconfig', 'karma:unit']);
    grunt.registerTask('ci', ['env:test', 'mochaTest', 'build', 'karmaconfig', 'karma:unit-ci']);

    grunt.registerTask('watch', ['build', 'concurrent']);
    grunt.registerTask('heroku', 'compile');

    function filter(files, regex) {
        return files.filter(function(file) {
            return file.match(regex);
        });
    }

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask( 'index', 'Process index.html template', function () {
        function src(files) {
            return files.map(function(file) {
                return file.src;
            }).reduce(function(a, b) {
                    return a.concat(b);
                });
        }

        function filterSrc(files, regex) {
            return filter(src(files), regex);
        }

        var angular = this.files.filter(function(file) {
            return !file.options || !file.options.non_angular;
        });
        var nonAngular = this.files.filter(function(file) {
            return file.options && file.options.non_angular;
        });
        var livereload = this.data.options && this.data.options['livereload'];

        grunt.file.copy('app/views/includes/noAngularScripts.tpl.html', 'app/views/includes/noAngularScripts.html', {
            process: function(contents) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: filterSrc(angular, /\.js$/),
                        styles: filterSrc(angular, /\.css$/),
                        scripts_non_angular: filterSrc(nonAngular, /\.js$/),
                        styles_non_angular: filterSrc(nonAngular, /\.css$/),
                        livereload: livereload
                    }
                });
            }
        });

        grunt.file.copy('app/views/includes/angularScripts.tpl.html', 'app/views/includes/angularScripts.html', {
            process: function(contents) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: filterSrc(angular, /\.js$/),
                        styles: filterSrc(angular, /\.css$/),
                        scripts_non_angular: filterSrc(nonAngular, /\.js$/),
                        styles_non_angular: filterSrc(nonAngular, /\.css$/),
                        livereload: livereload
                    }
                });
            }
        });
    });

    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function() {
        var jsFiles = filter(this.filesSrc, /\.js$/);

        grunt.file.copy('./karma.unit.tpl.js', './karma.unit.js', {
            process: function(contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });

    grunt.registerMultiTask('less_index', 'Generates index for less files', function() {
        grunt.file.write(this.data.dest, this.filesSrc.map(function (file) {
            return '@import "' + file.replace('assets/', '') + '";';
        }).join("\n"));
    });

    grunt.registerTask('build', [
        'clean:build',
        'copy',
        'less_index',
        'less:build',
        'less:build_non_angular',
        'html2js',
        'index:build'
    ]);

    grunt.registerTask('compile', [
        'clean:build',
        'copy',
        'ngmin',
        'html2js',
        'css_url_replace',
        'less_index',
        'less:dist',
        'less:dist_non_angular',
        'concat',
        'uglify',
        'index:compile',
        'clean:release'
    ]);

    

    
};