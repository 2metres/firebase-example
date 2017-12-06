const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const Records = require('spike-records')

const Prismic = require('prismic-javascript')
const PrismicDOM = require('prismic-dom')

require('dotenv').config()

const locals = {
  site: { title: 'YAAAAAY!' },
}

const homepageReq = () => (
  Prismic.api(process.env.PRISMIC_API_URL)
    .then(api => api.query('[ at(document.type, "homepage") ]'))
    .then(response => response.results[0])
)

const postsReq = () => (
  Prismic.api(process.env.PRISMIC_API_URL)
    .then(api => api.query('[ at(document.type, "post") ]'))
    .then(response => response.results)
)

module.exports = {
  devtool: 'source-map',
  ignore: [
    'firebase.json',
    '**/layout.html',
    '**/_*',
    '**/.*',
    'readme.md',
    'LICENSE',
    'yarn.lock',
    'package-lock.json',
  ],
  reshape: htmlStandards({
    locals: () => locals,
    minify: process.env.SPIKE_ENV === 'production',
    content: {
      'prismic-html': (data) => PrismicDOM.RichText.asHtml(JSON.parse(data)),
      'prismic-text': (data) => PrismicDOM.RichText.asText(JSON.parse(data))
    }
  }),
  plugins: [
    new Records({
      addDataTo: locals,
      homepage: { callback: homepageReq },
      posts: {
        callback: postsReq,
        template: {
          path: 'templates/post.html',
          output: (post) => `posts/${post.slugs[0]}.html`
        }
      },
    })
  ],
  postcss: cssStandards({
    minify: process.env.SPIKE_ENV === 'production',
    warnForDuplicates: process.env.SPIKE_ENV !== 'production'
  }),
  babel: jsStandards()
}
