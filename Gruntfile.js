/*!
 * Custom File Gruntfile
 * Copyright 2015 Marcos Ávila
 * marcos0x@gmail.com
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');
  var configBridge = grunt.file.readJSON('./src/grunt/configBridge.json', { encoding: 'utf8' });

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    jqueryCheck: configBridge.config.jqueryCheck.join('\n'),
    jqueryVersionCheck: configBridge.config.jqueryVersionCheck.join('\n'),

    // Task configuration.
    jshint: {
      options: {
        jshintrc: 'src/js/.jshintrc'
      },
      grunt: {
        options: {
          jshintrc: 'src/grunt/.jshintrc'
        },
        src: ['Gruntfile.js', 'src/grunt/*.js']
      },
      main: {
        src: 'src/js/*.js'
      },
    },

    jscs: {
      options: {
        config: 'src/js/.jscsrc'
      },
      grunt: {
        src: '<%= jshint.grunt.src %>'
      },
      main: {
        src: '<%= jshint.main.src %>'
      }
    },

    concat: {
      main: {
        src: [
          'src/js/jquery.custom-file.js'
        ],
        dest: 'dist/jquery.custom-file.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      main: {
        src: '<%= concat.main.dest %>',
        dest: 'dist/jquery.custom-file.min.js'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      jsMain: {
        files: ['<%= jshint.main.src %>'],
        tasks: ['dist-js']
      },
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      }
    }

  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  var isUndefOrNonZero = function (val) {
    return val === undefined || val !== '0';
  };

  // JS distribution task.
  grunt.registerTask('dist-js', [
    'concat:main', 
    'uglify:main', 
  ]);

  // Full distribution task.
  grunt.registerTask('dist', ['dist-js']);

};
