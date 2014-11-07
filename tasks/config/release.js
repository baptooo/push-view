'use strict';

module.exports = function (grunt) {
  grunt.config.set('release', {
    options: {
      npm: false,
      npmtag: false,
      tagName: 'release-<%= version %>',
      commitMessage: 'Release <%= version %>',
      tagMessage: 'Tag version <%= version %>',
      github: {
        repo: 'baptooo/push-view'
      }
    }
  });

  grunt.loadNpmTasks('grunt-release');
};