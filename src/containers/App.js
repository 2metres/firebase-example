import React from 'react'
import { Router } from 'react-static'
import Routes from 'react-static-routes'

import Nav from '../components/Nav'

const App = () => (
  <Router>
    <div>
      <Nav />
      <main id="content">
        <Routes />
      </main>
    </div>
  </Router>
)

export default App
