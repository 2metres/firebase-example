const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const Prismic = require('prismic-javascript');
const prismicHtml = require('prismic-dom').RichText.asHtml;
const prismicText = require('prismic-dom').RichText.asText;

require('dotenv').config()

const data = {
  homepage:
    Prismic.api(process.env.PRISMIC_API_URL)
      .then(api => api.query('[ at(document.type, "homepage") ]'))
      .then(response => response.results[0])
      .then(homepage => ({
        id: homepage.id,
        title: prismicText(homepage.data.homepage.title.value),
        description: prismicText(homepage.data.homepage.description.value),
        contents: prismicHtml(homepage.data.homepage.contents.value),
      })),
  posts:
    Prismic.api(process.env.PRISMIC_API_URL)
      .then(api => api.query('[ at(document.type, "post") ]'))
      .then(response => response.results)
      .then(res => res.map(post => ({
        id: post.id,
        slug: post.slugs[0],
        title: prismicText(post.data.post.title.value),
        contents: prismicHtml(post.data.post.contents.value),
      }))),
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public'),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  module: {
    rules: [{
      test: /\.html$/,
      use: [ 'html-loader', { loader: 'liquid-loader', options: { data } } ]
    }]
  },
};
