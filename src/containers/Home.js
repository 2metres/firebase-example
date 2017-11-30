import React from 'react'
import { getRouteProps } from 'react-static'
import { RichText } from 'prismic-reactjs'

const Home = ({ homepage }) => (
  <div>
    <h1>{homepage.title}</h1>
    <h4>{homepage.description}</h4>
    <div>{RichText.render(homepage.contents)}</div>
  </div>
)

export default getRouteProps(Home)
