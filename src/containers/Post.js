import React from 'react'
import { RichText } from 'prismic-reactjs'
import { compose } from 'recompose'
import {
  getRouteProps,
  getSiteProps,
  Head,
  Link,
} from 'react-static'

const Post = ({ post, site }) => (
  <div className="container">
    <Head>
      <title>{post.title} - {site.title}</title>
    </Head>

    <Link to="/posts">{'<'} Back</Link>

    <h1>{post.title}</h1>
    { RichText.render(post.contents) }
  </div>
)

export default compose(
  getSiteProps,
  getRouteProps,
)(Post)
