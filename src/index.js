import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './containers/App'

if (typeof document !== 'undefined') {
  const render = Component => {
    ReactDOM.hydrate(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('root'),
    )
  }

  render(App)

  if (module.hot) {
    module.hot.accept('./containers/App', () => { render(App) })
  }
}
