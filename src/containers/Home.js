import React from 'react'
import { getRouteProps } from 'react-static'
import { RichText } from 'prismic-reactjs'

const Home = ({ homepage }) => (
  <div className="container">
    <h1>{homepage.title}</h1>
    <h3>{homepage.description}</h3>
    <div>{ RichText.render(homepage.contents) }</div>
  </div>
)

export default getRouteProps(Home)
