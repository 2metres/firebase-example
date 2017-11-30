import React from 'react'
import { getRouteProps, Link } from 'react-static'
import { RichText } from 'prismic-reactjs'

const Posts = ({ posts }) => (
  <div>
    <h1>It’s blog time.</h1>
    <ul>
      {
        posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}/`}>{ RichText.asText(post.data.post.title.value) }</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

export default getRouteProps(Posts)
