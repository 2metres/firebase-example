const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allPrismicDocument {
          edges {
            node {
              slugs
            }
          }
        }
      }
    `).then(result => {
      result.data.allPrismicDocument.edges.map(({ node }) => {
        createPage({
          path: `/posts/${node.slugs[0]}`,
          component: path.resolve(`./src/templates/post.js`),
          context: {
            slug: node.slugs[0],
          },
        })
      })
      resolve()
    })
  })
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  const cssModulesConf = `css?modules&minimize&importLoaders=1`
  const cssModulesConfDev = `${cssModulesConf}&sourceMap&localIdentName=[folder]__[local]`
  const cssModulesConfTest = /\module\.scss$/;

  switch (stage) {
    case `develop`: {
      config.loader(`sass`, {
        test: /\.scss$/,
        exclude: cssModulesConfTest,
        loaders: [`style`, `css`, `sass`],
      })

      config.loader(`sassModules`, {
        test: cssModulesConfTest,
        loaders: [`style`, cssModulesConfDev, `sass`],
      })
      return config
    }
    case `build-css`: {
      config.loader(`sass`, {
        test: /\.scss$/,
        exclude: cssModulesConfTest,
        loader: ExtractTextPlugin.extract([`css?minimize`, `sass`]),
      })

      config.loader(`sassModules`, {
        test: cssModulesConfTest,
        loader: ExtractTextPlugin.extract(`style`, [cssModulesConf, `sass`]),
      })
      return config
    }
    case `build-html`: {
      config.loader(`sass`, {
        test: /\.scss$/,
        exclude: cssModulesConfTest,
        loader: `null`,
      })

      config.loader(`sassModules`, {
        test: cssModulesConfTest,
        loader: ExtractTextPlugin.extract(`style`, [cssModulesConf, `sass`]),
      })
      return config
    }
    case `build-javascript`: {
      config.loader(`sass`, {
        test: /\.scss$/,
        exclude: cssModulesConfTest,
        loader: `null`,
      })

      config.loader(`sassModules`, {
        test: cssModulesConfTest,
        loader: ExtractTextPlugin.extract(`style`, [cssModulesConf, `sass`]),
      })
      return config
    }
    default: {
      return config
    }
  }
}
