import React from 'react'
import { getSiteProps, Head } from 'react-static'

const About = ({ site }) => (
  <div className="container">
    <Head>
      <meta charSet="UTF-8" />
      <title>About - {site.title}</title>
    </Head>
    <h1>This is what we’re all about.</h1>
    <p>React, static sites, performance, speed. It’s the stuff that makes us tick.</p>
  </div>
)

export default getSiteProps(About)
