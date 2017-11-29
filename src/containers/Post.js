import React from 'react'
import { getRouteProps, Link } from 'react-static'
import { RichText } from 'prismic-reactjs'

const Post = ({ post }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    { RichText.render(post.title) }
    <p>{post.body}</p>
  </div>
)

export default getRouteProps(Post)
