import { applyMiddleware, createStore } from 'redux'
import { DEV_TOOLS } from '../constants'
import globalReducers from '../reducers/root-reducers'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

function configureStore () {
  const middlewares = [
    thunk,
    // multi,
    promise,
    logger
  ]

  const store = applyMiddleware(...middlewares)(createStore)(globalReducers, DEV_TOOLS)

  if (module.hot) {
    module.hot.accept('../reducers/root-reducers', () => {
      store.replaceReducer(require('../reducers/root-reducers').default)
    })
  }

  return store
}

export { configureStore }
