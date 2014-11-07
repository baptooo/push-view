'use strict';

module.exports = function (grunt) {
  grunt.config.set('karma', {
    unit: {
      configFile: 'karma.conf.js'
    },
    debug: {
      configFile: 'karma.conf.js',
      singleRun: false,
      autoWatch: true
    }
  });

  grunt.loadNpmTasks('grunt-karma');
};