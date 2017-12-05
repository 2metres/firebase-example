const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const Records = require('spike-records')
const Prismic = require('prismic-javascript')

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
    .then(response =>  response.results)
)

module.exports = {
  devtool: 'source-map',
  ignore: [
    '**/layout.html',
    '**/_*',
    '**/.*',
    'readme.md',
    'yarn.lock',
  ],
  reshape: htmlStandards({
    locals: () => locals
  }),
  plugins: [
    new Records({
      addDataTo: locals,
      homepage: { callback: homepageReq },
      posts: { callback: postsReq },
    })
  ],
  postcss: cssStandards({
    minify: process.env.SPIKE_ENV === 'production',
    warnForDuplicates: process.env.SPIKE_ENV !== 'production'
  }),
  babel: jsStandards()
}
