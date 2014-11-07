'use strict';

module.exports = function (grunt) {

  // Server debug
  grunt.registerTask('serve', [
    'sass:dev',
    'concat:dev',
    'connect:dev',
    'watch'
  ]);
};