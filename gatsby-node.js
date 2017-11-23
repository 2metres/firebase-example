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
