var _ = require('lodash');

var options = {
  //banner: '<%= banner %>',
  browserifyOptions: {
    debug: true
  },
  extension: [ '.js' ],
  transform: [
    [ 'babelify', { 'stage': 2 } ],
  ],
};

var optsW = _.extend(_.clone(options), { watch: true });

module.exports = {
  app: {
    options: options,
    files: {
      'dist/<%= pkg.name %>.js': ['src/index.js'],
    }
  },

  watch: {
    options: optsW,
    files: {
      'dist/<%= pkg.name %>.js': ['src/index.js'],
    }
  },

  tests: {
    options: optsW,
    src: [ 'test/suite.js' ],
    dest: 'test/browserified_tests.js'
  }

};
