import React from 'react'
import { getRouteProps, Link } from 'react-static'
import { RichText } from 'prismic-reactjs'

const Post = ({ post }) => (
  <div className="container">
    <Link to="/posts">{'<'} Back</Link>
    <h1>{ RichText.asText(post.data.post.title.value) }</h1>
    { RichText.render(post.data.post.contents.value) }
  </div>
)


export default getRouteProps(Post)
