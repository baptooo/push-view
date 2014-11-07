'use strict';

module.exports = function (grunt) {

  // Dist build & tests (pre-commit)
  grunt.registerTask('dist', [
    'build',
    'karma:unit'
  ]);
};