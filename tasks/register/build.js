'use strict';

module.exports = function (grunt) {

  // Build generation command
  grunt.registerTask('build', [
    'sass:dist',
    'concat:dev',
    'uglify:dist'
  ]);
};