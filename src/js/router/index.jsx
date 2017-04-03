import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Main from '../containers/Main'
import Home from '../components/Home'
import About from '../components/About'
import NotFound from '../components/NotFound'

export default function Routes (props) {
  return (
    <Router history={props.history}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="*" component={NotFound} />
        {/* <Redirect from="*" to="/404" /> */}
      </Route>
    </Router>
  )
}
