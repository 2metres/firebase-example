const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
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
        current.loaders[1] = current.loaders[1].replace(/localIdentName=.*?(&|!|$)/, 'localIdentName=[folder]__[local]&');
        return current;
      });
      return config;
    }
    case 'develop-html':
    case 'build-css':
    case 'build-html':
    case 'build-javascript': {
      config.loader('sassModules', (current) => {
        current.loader = current.loader.replace(/localIdentName=.*?(&|!|$)/, 'localIdentName=[folder]__[local]---[hash:base64:5]!');
        return current;
      });
      return config;
    }
    default: {
      return config;
    }
  }
};
