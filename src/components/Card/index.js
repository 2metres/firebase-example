import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import classNames from 'classnames/bind';

import styles from './module.scss';

const Card = ({
  title,
  body,
  url,
}) => (
  url
    ? (
      <Link
        to={ url }
        className={
          classNames.bind(styles)({
            root: true,
            link: url,
          })
        }
      >
        <h1 className={ styles.title }>{title}</h1>
        <div className={ styles.body }>{body}</div>
      </Link>
    )
    : (
      <div className={ styles.root }>
        <h1 className={ styles.title }>{title}</h1>
        <div className={ styles.body }>{body}</div>
      </div>
    )
);

Card.defaultProps = {
  url: '',
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default Card;
