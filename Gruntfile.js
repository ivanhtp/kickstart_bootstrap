/**
 * Grunt.js Configuration File
 * 'clean'         |  Clean 'build' folder to prepare it to receive files ready for deploy
 * 'uglify'        |  Compresses all javascript files and libraries into single files
 * 'compass'       |  Add Bootstrap library to compass take care of it
 * 'htmlmin'       |  Compresses all Html files
 * 'copy'          |  Copy it to 'build' folder
 * 'ftp-deploy'    |  Optional, run it separately to build in a ftp server (needs a .ftppass file)
 *
 * TODO - Add Angular.js
 * TODO - Create a minified app.js copy
 * TODO - Use compass bootstrap gem instead using it from bower folder (and kill bower)
**/

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Build folder clean
        clean: ['build', 'development/img', 'development/common/css'],

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
                            'development/lib/bootstrap/javascripts/affix.js'
                            //'bower_components/bootstrap-sass/vendor/javascripts/alert.js',
                            //'bower_components/bootstrap-sass/vendor/javascripts/button.js',
                            // ...
                        ],
                        dest: 'development/lib/bootstrap/bootstrap.min.js'
                    }
                ]
            },
            dist: {
                options: {
                    mangle: false
                },
                // Our Javascript File
                files: [
                    // Admin
                    {
                        src: 'development/js/app.js',
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>/js/app.js'
                    }
                ]
            }
        },

        // Pré-processamento e compressão CSS
        compass: {
            dev: {
                options: {
                    require: ['bootstrap-sass'],
                    sassDir: 'scss',
                    imagesDir: 'img',
                    cssDir: 'development/css',
                    javascriptsDir: 'development/lib',
                    httpGeneratedImagesPath: '/img',
                    noLineComments: true
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
                        dest: 'build/<%= pkg.name %>/<%= pkg.version %>/*.html'
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
    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Não modificar a ordem de execução a não ser que você saiba o que está fazendo...
    grunt.registerTask('default', ['clean', 'uglify', 'compass', 'htmlmin', 'copy']);

};