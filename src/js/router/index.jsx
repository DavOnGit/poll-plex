import React from 'react'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import Redirect from 'react-router/lib/Redirect'
import IndexRoute from 'react-router/lib/IndexRoute'

import Main from '../containers/Main'
import Home from '../components/Home'
import About from '../components/About'
import NotFound from '../components/NotFound'

export default function Routes (props) {
  return (
    <Router history={props.history}>
      <Route path='/' component={Main}>
        <IndexRoute component={Home} />
        {/* <Route path='poll' component={PollDetails} /> */}
        <Route path='about' component={About} />
        <Route path='*' component={NotFound} />
        {/* <Redirect from='*' to='/404' /> */}
      </Route>
    </Router>
  )
}
