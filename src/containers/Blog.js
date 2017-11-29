import React from 'react'
import { getRouteProps, Link } from 'react-static'
import { RichText } from 'prismic-reactjs'

const Blog = ({ posts }) => (
  <div>
    <h1>It's blog time.</h1>
    <br />
    All Posts:
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/blog/post/${post.id}/`}>{ RichText.asText(post.title) }</Link>
        </li>
      ))}
    </ul>
  </div>
)

export default getRouteProps(Blog)
