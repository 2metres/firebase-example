const path = require('path');
const GATSBY_LOCAL_IDENT_NAME = require('gatsby-1-config-css-modules').LOCAL_IDENT_NAME;

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve) => {
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
          path: `/posts/${ node.slugs[0] }`,
          component: path.resolve('./src/templates/post.js'),
          context: {
            slug: node.slugs[0],
          },
        });
      });
      resolve();
    });
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop': {
      config.loader('sassModules', (current) => {
        current.loaders = current.loaders.map(loader => loader.replace(GATSBY_LOCAL_IDENT_NAME, '[folder]__[local]'));
        return current;
      });
      return config;
    }
    case 'develop-html':
    case 'build-css':
    case 'build-html':
    case 'build-javascript': {
      config.loader('sassModules', (current) => {
        current.loader = current.loader.replace(GATSBY_LOCAL_IDENT_NAME, '[folder]__[local]---[hash:base64:5]');
        return current;
      });
      return config;
    }
    default: {
      return config;
    }
  }
};
