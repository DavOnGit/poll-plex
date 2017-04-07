import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notifReducer } from 'redux-notifications'

import {
  pollsReducer,
  loaderReducer
} from './reducers'

const rootReducer = combineReducers({
  polls: pollsReducer,
  loader: loaderReducer,
  routing: routerReducer,
  notifs: notifReducer
})

export default rootReducer
