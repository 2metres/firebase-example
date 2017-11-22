import React from 'react'
import Link from 'gatsby-link'
import PrismicDOM from 'prismic-dom';

import PrismicHtml from '../helpers/PrismicHtml';

const IndexPage = ({ data }) => {
  const homepage = {
    id: data.prismic.results[0].node.id,
    slugs: data.prismic.results[0].node.slugs,
    title: data.prismic.results[0].node.data.title[0].text,
    description: data.prismic.results[0].node.data.description,
    contents: data.prismic.results[0].node.data.contents,
  }

  console.info(homepage)

  return (
    <div>
      <h1>{ homepage.title }</h1>
      <PrismicHtml>{ homepage.description }</PrismicHtml>
      <PrismicHtml>{ homepage.contents }</PrismicHtml>
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  )
}

export const pageQuery = graphql`
  query Homepage {
    prismic: allPrismicDocument(filter: { type: { eq: "homepage" } }) {
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
  }
`
export default IndexPage
