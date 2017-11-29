import React from 'react'
import { getRouteProps } from 'react-static'
import { RichText } from 'prismic-reactjs'

const Home = ({ homepage }) => (
  <div>
    <h1>{ RichText.asText(homepage.data.homepage.title.value) }</h1>
  </div>
)

export default getRouteProps(Home)
