import React from 'react'
import Link from 'gatsby-link'
import { RichText } from 'prismic-reactjs';

import Card from '../../components/Card';

const PostIndex = ({ data }) => {
  const posts = data.posts.results.map(post => post.node)

  console.log(posts);

  return (
    <div className="container">
      <div className="row">
        { posts.map(post => (
          <div key={ post.slugs[0] } className="col-md-6">
            <Card
              title={ RichText.asText(post.data.title) }
              body={ RichText.asText(post.data.contents) }
              url={ `/posts/${ post.slugs[0] }` }
            />
          </div>))
        }
      </div>
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
