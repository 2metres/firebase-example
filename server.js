var dotEnvLoaded = require('dotenv').config({ silent: true, });
console.log('.env file loaded:', dotEnvLoaded);

var autoprefixer = require('metalsmith-autoprefixer');
var beautify = require('metalsmith-beautify');
var ignore = require('metalsmith-ignore');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var sass = require('metalsmith-sass');
var server = require('metalsmith-prismic-server');

var handlebarsHelpers = require('./plugins/handlebars-helpers');

var argv = require('process').argv;

var config = {
  prismicLinkResolver (ctx, doc) {
    if (doc.isBroken) {
      return;
    }
    var filename = doc.data ? 'index.html' : '';

    switch (doc.type) {
      case 'homepage':
        return '/' + filename;
      default:
        return '/' + doc.type + 's/' +  (doc.uid || doc.slug) + '/' + filename;
    }
  },
  plugins: {
    common: [
      markdown(),
      handlebarsHelpers(),
      layouts({
        engine: 'handlebars',
        directory: 'layouts',
        partials: 'partials',
        pattern: '**/*.html'
      }),
      sass({
        outputDir: 'assets'
      }),
      autoprefixer({
        browsers: ['last 2 versions', '> 5%']
      }),
      beautify({
        indent_size: 2,
        indent_char: ' ',
        wrap_line_length: 0,
        end_with_newline: true,
        css: true,
        html: true
      }),
      ignore([
        '**/*.scss'
      ])
    ],
    deploy: [

    ]
  }
};

function run() {
  // Start server
  switch (argv[2]) {
    case 'dev':
      server.dev(config);
      break;
    case 'prod':
      server.prod(config);
      break;
    case 'build':
      server.build(config, []);
      break;
    default:
      console.error(`invalid command '${argv[2]}'`);
  }
}

if (require.main === module) {
  run();
}
