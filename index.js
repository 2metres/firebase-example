var Metalsmith  = require('metalsmith');
var debug       = require('metalsmith-debug');
var markdown    = require('metalsmith-markdown');
var templates   = require('metalsmith-templates');
var logger      = require('metalsmith-logger');
var permalinks  = require('metalsmith-permalinks');
var prismic     = require('metalsmith-prismic');

require('dotenv').config()

Metalsmith(__dirname)
  .use(prismic({
    "url": process.env.PRISMIC_API_URL,
    "accessToken": process.env.PRISMIC_API_ACCESS_TOKEN,
    "release": process.env.PRISMIC_API_RELEASE
  }))
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(markdown())
  .use(debug())
  .use(permalinks())
  .use(templates({
    "engine": "handlebars"
  }))
  .build(function(err, files) {
    console.log(files['index.html'].prismic.homepage.results[0].data.title.json.blocks)
    if (err) { throw err; }
  });
