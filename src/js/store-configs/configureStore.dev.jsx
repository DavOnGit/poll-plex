import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { enableBatching } from 'redux-batched-actions'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

const logger = createLogger({diff: true})

const composeStore = compose(
  applyMiddleware(thunk, logger),
  window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
)(createStore)

export default (initialState = {}) => {
  const store = composeStore(enableBatching(rootReducer), initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }
  return store
}
