'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dev: {
                options: {
                    sourcemap: true,
                    loadPath: ['bower_components/', 'src/']
                },
                files: {
                    'src/css/push-view.css': 'src/main.scss'
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
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('server', ['sass:dev', 'connect:dev', 'watch']);
}