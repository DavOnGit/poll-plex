import { PropTypes, default as React } from 'react'
import { Provider } from 'react-redux'
import { Notifs } from 'redux-notifications'

import Router from '../router/'

const Root = (props) => (
  <Provider store={props.store}>
    <div>
      <Router history={props.history} />
      <Notifs />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
