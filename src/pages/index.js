import React from 'react'
import Link from 'gatsby-link'
import PrismicDOM from 'prismic-dom';

import PrismicHtml from '../helpers/PrismicHtml';

const IndexPage = ({ data }) => {
  const homepage = {
    id: data.homepages.results[0].node.id,
    slugs: data.homepages.results[0].node.slugs,
    title: data.homepages.results[0].node.data.title[0].text,
    description: data.homepages.results[0].node.data.description,
    contents: data.homepages.results[0].node.data.contents,
  }

  const posts = data.posts.results.map(post => post.node)

  return (
    <div>
      <h1>{ homepage.title }</h1>
      <PrismicHtml>{ homepage.description }</PrismicHtml>
      <PrismicHtml>{ homepage.contents }</PrismicHtml>
      <ul>
        { posts.map(post => (
          <li>
            <Link to={ `${ post.slugs[0] }` }>{ post.data.title[0].text }</Link>
          </li>))
        }
      </ul>
    </div>
  )
}

export const pageQuery = graphql`
  query Homepage {
    homepages: allPrismicDocument(filter: { type: { eq: "homepage" } }) {
      results: edges {
        node {
          id
          slugs
          data {
            title {
              type
              text
            }
            description {
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

export default IndexPage
