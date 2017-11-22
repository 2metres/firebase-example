import React from 'react'
import PrismicDOM from 'prismic-dom'

/* eslint-disable react/no-danger */
const PrismicHtml = ({ children }) => (
  <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(children) }} />
)
/* eslint-enable react/no-danger */

export default PrismicHtml;
