import React from 'react'
import {
  getSiteProps,
  Head,
} from 'react-static'

const fourOHFour = ({ site }) => (
  <div className="container">
    <Head>
      <title>Page not found - {site.title}</title>
    </Head>
    
    <h1>404 - Oh noes! We couldn't find that page :(</h1>
  </div>
)

export default getSiteProps(fourOHFour)
