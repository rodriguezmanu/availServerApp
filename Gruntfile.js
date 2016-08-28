'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-express-server');

  grunt
      .initConfig({

        // Project settings
        pkg : grunt.file.readJSON('package.json'),

        //open server on browser
        open : {
          server : {
            url : 'http://localhost:8080'
          }
        },

        //express connect
        express : {
          options : {
            port : 8080,
            delay: 5
          },
          dev : {
            options : {
              script : 'server.js'
            }
          }
        },

        //listener
        watch : {
          express: {
            files:  [ 'app/**/*.js' ],
            tasks:  [ 'express:dev' ],
            options: {
              spawn: false
            }
          },
          livereload : {
            files : [
                'app/**/*.js',
                'app/**/*.html'
              ],
            options : {
              livereload : true
            }
          }
        },

        // Make sure code styles are up to par and there are no obvious
        jshint : {
          options : {
            verbose: true,
            jshintrc : '.jshintrc',
            reporter : require('jshint-stylish')
          },
          all : [
              'app/**/*.js'
          ],
        },

        // Test settings
        karma : {
          unit : {
            configFile : 'karma.conf.js',
            singleRun : true
          }
        },

        // Checks your JavaScript code style matches the rules in .jscsrc
        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: [
                'app/**/*.js'
            ]
        }
    });

  grunt.registerTask('test', function(target) {
    grunt.task.run(['karma']);
  });

  grunt.registerTask('serve', ['express:dev', 'open', 'watch']);

  grunt.registerTask('lint', ['jscs', 'jshint']);
};
