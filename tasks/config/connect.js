'use strict';

module.exports = function (grunt) {
  grunt.config.set('connect', {
    dev: {
      options: {
        hostname: '*',
        port: 1990
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
};