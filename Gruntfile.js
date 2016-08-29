'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-preprocess');

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

        //Set env
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            prod : {
                NODE_ENV: 'production'
            }
        },

        // minify js
        uglify: {
           options: {
             mangle: false
           },
           min: {
            files: [{
                src: 'tmp/app/**/*.js',
                dest: 'dist/app/app.min.js'
            }]
           }
         },

         // copy json mocks files
         copy: {
           main: {
             files: [
               {expand: true, src: ['app/mocks/*.json'], dest: 'dist/'}
             ],
           },
         },

        // Compiles ES6 to JavaScript using Babel
        babel : {
          options : {
            sourceMap : true,
            presets: ['es2015']
          },
          dist: {
            files: [{
              expand: true,
              src: [
                'app/**/*.js',
                '!app/**/*.spec.js'
              ],
              dest: 'tmp/',
            }]
          },
        },

        //adding conditial index.html
        preprocess : {
          src  : 'base.html',
          dest : 'index.html'
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
                '!app/**/*.spec.js',
                'app/**/*.html',
                'app/**/*.css'
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

  grunt.registerTask('test',['karma']);
  grunt.registerTask('serve', ['express:dev', 'env:dev', 'preprocess', 'open', 'watch']);
  grunt.registerTask('lint', ['jscs', 'jshint']);
  grunt.registerTask('build', ['babel', 'uglify', 'env:prod', 'preprocess', 'copy']);
};
