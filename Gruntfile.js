/**
 * Grunt.js Configuration File
 * 'clean'         |  Clean 'build' folder to prepare it to receive files ready for deploy
 * 'uglify'        |  Compresses all javascript files and libraries into single files
 * 'compass'       |  Add Bootstrap library to compass take care of it
 * 'htmlmin'       |  Compresses all Html files
 * 'copy'          |  Copy it to 'build' folder
 * 'connect'       |  Optional, creates a local webserver right after the build with the 'development' folder as root
 * 'ftp-deploy'    |  Optional, run it separately to build in a ftp server (needs a .ftppass file)
 *
 * TODO - Create a minified app.js copy
 * TODO - Use compass bootstrap gem instead using it from bower folder (and kill bower)
**/

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Clean the 'build' folder
        clean: ['build', 'development/img', 'development/css'],

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
                            'development/lib/bootstrap/javascripts/bootstrap.js',
                            'development/lib/bootstrap/javascripts/collapse.js',
                            'development/lib/bootstrap/javascripts/dropdown.js',
                            'development/lib/bootstrap/javascripts/offcanvas.js',
                            'development/lib/bootstrap/javascripts/transition.js'
                            // ...
                        ],
                        dest: 'development/lib/bootstrap/bootstrap.min.js'
                    },
                // AngularJS
                    {
                        src: [
                            'development/lib/angularjs/angular.js',
                            'development/lib/angularjs/angular-route.js',
                            'development/lib/angularjs/ui-bootstrap.js'
                        ],
                        dest: 'development/lib/angularjs/angular.min.js'
                    },
                // App Javascripts
                    {
                        src : [
                            'development/js/app.js',
                            'development/js/directives.js',
                            'development/js/controllers/diary.js',
                            'development/js/services.js'
                        ],
                        dest : 'development/js/app.min.js'
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
                        src: 'development/js/app.min.js',
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
                    sassDir: 'scss',
                    imagesDir: 'img',
                    cssDir: 'development/css',
                    javascriptsDir: 'development/lib',
                    httpGeneratedImagesPath: 'development/img',
                    noLineComments: false
                }
            },
            dist: {
                options: {
                    require: ['bootstrap-sass'],
                    sassDir: 'scss',
                    imagesDir: 'img',
                    cssDir: 'build/<%= pkg.name %>/<%= pkg.version %>/css',
                    javascriptsDir: 'build/<%= pkg.name %>/<%= pkg.version %>/lib',
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
                    // Admin
                    {
                        src: 'development/*.html',
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>'
                    }
                ]
            }
        },

        // File Copies
        copy: {
            dev: {
                files: [
                    // Sprites
                    {
                        expand: true,
                        src: ['img/*.png'],
                        dest: 'development/'
                    }
                ]
            },
            dist: {
                files: [
                    // 3rd Party Files
                    {
                        expand: true,
                        cwd: 'development',
                        src: ['lib/**/*'],
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>'
                    },

                    // Sprites
                    {
                        expand: true,
                        cwd: 'development',
                        src: ['img/**/*'],
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>'
                    }
                ]
            }
        },

        connect: {
            server: {
                options: {
                    base: 'development',
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
    grunt.registerTask('dev', ['uglify:dev', 'compass:dev', 'copy:dev', 'connect']);
    grunt.registerTask('dist', ['clean', 'uglify', 'compass', 'htmlmin', 'copy']);


};