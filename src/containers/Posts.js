import React from 'react'
import { RichText } from 'prismic-reactjs'
import { compose } from 'recompose'
import {
  getRouteProps,
  getSiteProps,
  Head,
  Link,
} from 'react-static'

const Posts = ({ posts, site }) => (
  <div className="container">
    <Head>
      <meta charSet="UTF-8" />
      <title>Blog - {site.title}</title>
    </Head>
    <h1>It’s blog time.</h1>
    <ul>
      {
        posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.slugs[0]}/`}>{ RichText.asText(post.data.post.title.value) }</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

export default compose(
  getSiteProps,
  getRouteProps,
)(Posts)
