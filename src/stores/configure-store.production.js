import { applyMiddleware, createStore } from 'redux'
import globalReducers from '../reducers/root-reducers'
import thunk from 'redux-thunk'
import promise from 'redux-promise'

export function configureStore () {
  return applyMiddleware(thunk, promise)(createStore)(globalReducers)
}
