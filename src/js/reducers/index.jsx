import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notifReducer } from 'redux-notifications'

import {
  pollsReducer,
  loaderReducer,
  authReducer
} from './reducers'

const rootReducer = combineReducers({
  polls: pollsReducer,
  isFetching: loaderReducer,
  auth: authReducer,
  routing: routerReducer,
  notifs: notifReducer
})

export default rootReducer
