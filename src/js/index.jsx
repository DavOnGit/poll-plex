import React from 'react'
import ReactDOM from 'react-dom'
import browserHistory from 'react-router/lib/browserHistory'
import { syncHistoryWithStore } from 'react-router-redux'
import firebase from './firebase/'

import configureStore from './store-configs/configureStore'
import { login, logout } from './actions/actions'
import '../styles/'

const rootEl = document.getElementById('react-root')
const initialState = {}
const store = configureStore(initialState)

export const history = syncHistoryWithStore(browserHistory, store)

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(
      {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL
      }
      ))
  } else {
    const hist = history.getCurrentLocation()
    const { pathname } = hist
    store.dispatch(logout())
    if (pathname.match(/^\/poll\/.*/)) {
      return
    }
    history.push('/')
  }
})

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
      console.log(error)
      renderError(error)
    }
  }
  module.hot.accept('./containers/Root', () => {
    render()
  })
}
render()
