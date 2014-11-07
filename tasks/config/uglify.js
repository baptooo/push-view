'use strict';

module.exports = function (grunt) {
  grunt.config.set('uglify', {
    dist: {
      options: {
        wrap: true
      },
      files: {
        'dist/push-view.min.js': ['build/push-view.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};