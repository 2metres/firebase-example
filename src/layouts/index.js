import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import '../styles/app.scss';

const TemplateWrapper = ({ children }) => (
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
);

TemplateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplateWrapper;
