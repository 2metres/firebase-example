import React from 'react'
import { RichText } from 'prismic-reactjs'
import { compose } from 'recompose'
import {
  getRouteProps,
  getSiteProps,
  Head,
} from 'react-static'

const Home = ({ homepage, site }) => (
  <div className="container">
    <Head>
      <meta charSet="UTF-8" />
      <title>{homepage.title} - {site.title}</title>
    </Head>

    <h1>{homepage.title}</h1>
    <h3>{homepage.description}</h3>
    <div>{ RichText.render(homepage.contents) }</div>
  </div>
)

export default compose(
  getSiteProps,
  getRouteProps,
)(Home)
