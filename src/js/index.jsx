import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store-configs/configureStore'
import '../styles/'

const rootEl = document.getElementById('react-root')

const initialState = {}
const store = configureStore(initialState)

const history = syncHistoryWithStore(browserHistory, store)

// hot reloading
let render = () => {
  const Root = require('./containers/Root')
  ReactDOM.render(
    <Root store={store} history={history} />,
    rootEl
  )
}

if (module.hot) {
  const renderApp = render

  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    )
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept('./containers/Root', () => {
    render()
  })
}
render()
