'use strict';

module.exports = function (grunt) {

  // Tests debugMode
  grunt.registerTask('test', [
    'build',
    'karma:debug'
  ]);
};