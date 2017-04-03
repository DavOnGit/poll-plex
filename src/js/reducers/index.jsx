import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notifReducer } from 'redux-notifications'

const rootReducer = combineReducers({
  routing: routerReducer,
  notifs: notifReducer
})

export default rootReducer
