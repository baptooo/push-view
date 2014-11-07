'use strict';

module.exports = function (grunt) {
    var includeAll = require('include-all');

    /**
     * Require every js file found in relPath
     * @param relPath
     * @returns {*|modules|exports}
     */
    function loadTasks(relPath) {
        return includeAll({
            dirname: require('path').resolve(__dirname, relPath),
            filter: /(.+)\.js$/
        });
    }

    /**
     * Execute the stack of tasks with grunt as parameter
     * @param tasks
     */
    function invokeConfigFn(tasks) {
        for(var i in tasks) {
            if(tasks.hasOwnProperty(i) && /^f/.test(typeof tasks[i])) {
                tasks[i](grunt);
            }
        }
    }

    // Retrieving tasks configuration
    var tasksConfig = loadTasks('tasks/config'),
    // Retrieving tasks registration
      tasksRegistering = loadTasks('tasks/register');

    // Setting default grunt task if not setted
    if(!tasksRegistering.default) {
        tasksRegistering.default = function(grunt) {
            grunt.registerTask('default', []);
        };
    }

    // Invoke the tasks configuration
    invokeConfigFn(tasksConfig);
    // Invoke the tasks registration
    invokeConfigFn(tasksRegistering);
};