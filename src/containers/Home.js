import React from 'react'
import { getRouteProps } from 'react-static'
import { RichText } from 'prismic-reactjs'

const Home = ({ homepage }) => (
  <div>
    <h1>{ RichText.asText(homepage.data.homepage.title.value) }</h1>
    <h4>{ RichText.asText(homepage.data.homepage.description.value) }</h4>
    <div>
      { RichText.render(homepage.data.homepage.contents.value) }
    </div>
  </div>
)

export default getRouteProps(Home)
