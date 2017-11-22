import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const TemplateWrapper = ({ children, data }) => {
  return (
      <div>
      <header>
        <div>
          <h1>
            <Link to="/">Gatsby</Link>
          </h1>
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
