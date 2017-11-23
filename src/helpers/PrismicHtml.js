import React from 'react'
import { RichText } from 'prismic-reactjs';

/* eslint-disable react/no-danger */
const PrismicHtml = ({ children }) => (
  RichText.render(children)
)
/* eslint-enable react/no-danger */

export default PrismicHtml;
