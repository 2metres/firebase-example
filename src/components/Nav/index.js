import React from 'react'
import { Link } from 'react-static'

import styles from './module.scss'

const Nav = () => (
  <nav className={styles.root}>
    <div className="container">
      <Link className={styles.link} to="/">Home</Link>
      <Link className={styles.link} to="/about">About</Link>
      <Link className={styles.link} to="/posts">Posts</Link>
    </div>
  </nav>
)

export default Nav
