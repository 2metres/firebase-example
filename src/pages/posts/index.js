import React from 'react'
import Link from 'gatsby-link'

const PostIndex = ({ data }) => {
  const posts = data.posts.results.map(post => post.node)

  return (
    <div className="container">
      <ul>
        { posts.map(post => (
          <li key={ post.slugs[0] }>
            <Link to={`/posts/${ post.slugs[0] }/`}>{ post.data.title[0].text }</Link>
          </li>))
        }
      </ul>
    </div>
  )
}

export const postIndexQuery = graphql`
  query PostIndex {
    posts: allPrismicDocument(filter: { type: { eq: "post" } }) {
      results: edges {
        node {
          id
          slugs
          data {
            title {
              type
              text
            }
            contents {
              type
              text
            }
          }
        }
      }
    }
  }
`;

export default PostIndex
