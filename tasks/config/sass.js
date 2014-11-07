'use strict';

module.exports = function (grunt) {
  grunt.config.set('sass', {
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
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};