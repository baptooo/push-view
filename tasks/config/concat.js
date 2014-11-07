'use strict';

module.exports = function (grunt) {
  grunt.config.set('concat', {
    dev: {
      src: [
        'src/js/transitionEnd.js',
        'src/js/push-view.js'
      ],
      dest: 'build/push-view.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};