import React from 'react'
import Link from 'gatsby-link'
import { RichText } from 'prismic-reactjs';

const IndexPage = ({ data }) => {
  const homepage = {
    id: data.homepages.results[0].node.id,
    slugs: data.homepages.results[0].node.slugs,
    title: data.homepages.results[0].node.data.title,
    description: data.homepages.results[0].node.data.description,
    contents: data.homepages.results[0].node.data.contents,
  }

  const posts = data.posts.results.map(post => post.node)

  return (
    <div className="container">
      <h1>{ RichText.asText(homepage.title) }</h1>
      <section>{ RichText.render(homepage.description) }</section>
      <div>{ RichText.render(homepage.contents) }</div>
      <ul>
        { posts.map(post => (
          <li key={ post.slugs[0] }>
            <Link to={`posts/${ post.slugs[0] }`}>{ post.data.title[0].text }</Link>
          </li>))
        }
      </ul>
    </div>
  )
}

export const homepageQuery = graphql`
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
