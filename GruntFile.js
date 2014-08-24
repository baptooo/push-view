'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dev: {
                options: {
                    sourcemap: true
                },
                files: {
                    'build/push-view.css': 'src/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/push-view.min.css': 'src/main.scss'
                }
            }
        },
        concat: {
            dev: {
                src: [
                    'src/js/transitionEnd.js',
                    'src/js/push-view.js'
                ],
                dest: 'build/push-view.js'
            }
        },
        uglify: {
            dist: {
                options: {
                    wrap: true
                },
                files: {
                    'dist/push-view.min.js': ['build/push-view.js']
                }
            }
        },
        connect: {
            dev: {
                options: {
                    hostname: '*',
                    port: 1990
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: 'src/**/*.scss',
                tasks: ['sass:dev']
            },
            js: {
                files: 'src/js/**/*.js',
                tasks: ['concat:dev']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            },
            debug: {
                configFile: 'karma.conf.js',
                singleRun: false,
                autoWatch: true
            }
        },
        release: {
            options: {
                npm: false,
                npmtag: false,
                tagName: 'release-<%= version %>',
                commitMessage: 'Release <%= version %>',
                tagMessage: 'Tag version <%= version %>',
                github: {
                    repo: 'baptooo/push-view'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-karma');

    // Server debug
    grunt.registerTask('server', ['sass:dev', 'concat:dev', 'connect:dev', 'watch']);

    // Build generation command
    grunt.registerTask('build', ['sass:dist', 'concat:dev', 'uglify:dist']);
    // Dist build & tests (pre-commit)
    grunt.registerTask('dist', ['build', 'karma:unit']);

    grunt.registerTask('publish', ['dist', 'release']);

    // Tests debugMode
    grunt.registerTask('test', ['build', 'karma:debug']);

}