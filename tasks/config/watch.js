'use strict';

module.exports = function (grunt) {
  grunt.config.set('watch', {
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
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};