/**
 * Grunt.js Configuration File
 * 'clean'         |  Clean 'build' version to prepare it to receive files ready for deploy
 * 'uglify'        |  Compresses all javascript files and libraries into single files
 * 'compass'       |  Add Bootstrap library to compass take care of it
 * 'htmlmin'       |  Compresses all Html files
 * 'copy'          |  Copy it to 'build' version
 * 'connect'       |  Optional, creates a local webserver right after the build with the 'src' version as root
 * 'ftp-deploy'    |  Optional, run it separately to build in a ftp server (needs a .ftppass file)
 *
 * TODO - Create a minified app.js copy
 * TODO - Use compass bootstrap gem instead using it from bower version (and kill bower)
**/

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Clean the 'build' version
        clean: ['build', 'src/img', 'src/css'],

        // Javacript Compression
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            dev: {
                // Bootstrap
                files: [
                    {
                        src: [
                            'src/js/vendors/lib/bootstrap/javascripts/bootstrap.js',
                            'src/js/vendors/lib/bootstrap/javascripts/collapse.js',
                            'src/js/vendors/lib/bootstrap/javascripts/dropdown.js',
                            'src/js/vendors/lib/bootstrap/javascripts/modal.js',
                            'src/js/vendors/lib/bootstrap/javascripts/offcanvas.js',
                            'src/js/vendors/lib/bootstrap/javascripts/tooltip.js',
                            'src/js/vendors/lib/bootstrap/javascripts/transition.js'
                            // ...
                        ],
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>/pending/src/js/vendors/lib/bootstrap/bootstrap.min.js'
                    },
                // AngularJS
                    {
                        src: [
                            'src/js/vendors/lib/angularjs/angular.js',
                            'src/js/vendors/lib/angularjs/angular-route.js',
                            'src/js/vendors/lib/angularjs/ui-bootstrap.js'
                        ],
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>/pending/src/js/vendors/lib/angularjs/angular.min.js'
                    },
                // App Javascripts
                    {
                        src : [
                            'src/js/app.js',
                            'src/js/directives.js',
                            'src/js/controllers/diary.js',
                            'src/js/services.js'
                        ],
                        dest : 'build/<%= pkg.name %>/<%= pkg.version %>/pending/src/js/app.min.js'
                    }
                ]
            },
            dist: {
                options: {
                    mangle: false,
                    compress: true
                },
                files: [
                    {
                        src: 'src/js/app.min.js',
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>/js/app.min.js'
                    }
                ]
            }
        },

        // Sass Compilation + CSS Compression
        compass: {
            dev: {
                options: {
                    require: ['bootstrap-sass'],
                    sassDir: 'src/scss',
                    imagesDir: 'src/img',
                    cssDir: 'build/<%= pkg.name %>/<%= pkg.version %>/pending/css',
                    javascriptsDir: 'build/<%= pkg.name %>/<%= pkg.version %>/pending/js/vendors/lib',
                    httpGeneratedImagesPath: 'build/<%= pkg.name %>/<%= pkg.version %>/img',
                    noLineComments: false
                }
            },
            dist: {
                options: {
                    require: ['bootstrap-sass'],
                    sassDir: 'src/scss',
                    imagesDir: 'src/img',
                    cssDir: 'build/<%= pkg.name %>/<%= pkg.version %>/pending/css',
                    javascriptsDir: 'build/<%= pkg.name %>/<%= pkg.version %>/pending/js/vendors/lib',
                    httpGeneratedImagesPath: 'build/<%= pkg.name %>/<%= pkg.version %>/img',
                    noLineComments: true,
                    outputStyle: 'compressed'
                }
            }
        },

        // HTML Compression
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    // pending
                    {
                        src: 'src/*.html',
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>'
                    }
                ]
            }
        },

        // File Copies
        copy: {
            default: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/img',
                        src: ['favicon/*','gif/*'],
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>/pending/img'
                    },
                    {
                        expand: true,
                        cwd: 'src/js/vendors',
                        src: [
                            'css/*',
                            'polyfills/*',
                            'js/jquery.min.js',
                            'js/jquery.minicolors.min.js',
                            'js/jquery.urlparser.min.js',
                            'js/modernizr.min.js',
                            'js/require.js',
                            'lib/glyphicons/*'
                        ],
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>/pending/js/vendors'
                    }
                ]
            }
        },

        connect: {
            server: {
                options: {
                    base: 'build/<%= pkg.name %>/<%= pkg.version %>/pending',
                    directory: '',
                    hostname: 'localhost',
                    port: 8888,
                    keepalive: true
                }
            }
        },


        // Deploy via FTP
        'ftp-deploy': {
            build: {
                auth: {
                    host: '<%= pkg.httpServer.host %>',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'build/<%= pkg.name %>',
                dest: '<%= pkg.name %>'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Call tasks in order, don't move    unless you know what you are doing
    grunt.registerTask('default', ['clean', 'uglify', 'compass', 'htmlmin', 'copy']);
    grunt.registerTask('dev', ['uglify:dev', 'compass:dev', 'copy', 'connect']);
    grunt.registerTask('dist', ['clean', 'uglify', 'compass', 'htmlmin', 'copy']);


};