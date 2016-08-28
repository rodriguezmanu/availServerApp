module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks:['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/app.js',
      'app/constant.js',
      'app/router.js',
      'app/**/*.module.js',
      'app/**/*.js',
      'app/**/*.html'
    ],
    preprocessors: {
      'app/**/*.js': 'babel'
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS2'],
    singleRun: false,
    reporters: ['progress']
  });
};
