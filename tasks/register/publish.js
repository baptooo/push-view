'use strict';

module.exports = function (grunt) {

  // Publish to bower command
  grunt.registerTask('publish', [
    'dist',
    'release'
  ]);
};