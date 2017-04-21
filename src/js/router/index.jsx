import React from 'react'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import IndexRoute from 'react-router/lib/IndexRoute'
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware'
import { useScroll } from 'react-router-scroll'

import Main from '../containers/Main'
import Home from '../components/Home'
import Poll from '../components/Poll'
import MyPolls from '../components/MyPolls'
import NewPoll from '../components/NewPoll'
import About from '../components/About'
import NotFound from '../components/NotFound'

const requireLogin = (nextState, replace) => {
  if (window.localStorage.getItem('uid') === null) {
    replace('/')
  }
}

export default function Routes (props) {
  return (
    <Router history={props.history} render={applyRouterMiddleware(useScroll())}>
      <Route path='/' component={Main}>
        <IndexRoute component={Home} />
        <Route path='poll/:id' component={Poll} />
        <Route path='mypolls' component={MyPolls} onEnter={requireLogin} />
        <Route path='newpoll' component={NewPoll} onEnter={requireLogin} />
        <Route path='about' component={About} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  )
}
