import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import './index.scss';

const TemplateWrapper = ({ children, data }) => {
  return (
      <div>
      <header>
        <div className="container">
          <h2>
            <Link to="/">Gatsby</Link>
          </h2>
        </div>
      </header>
      <main>
        { children() }
      </main>
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
