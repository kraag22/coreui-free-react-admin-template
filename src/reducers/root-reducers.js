import { combineReducers } from 'redux'
import appReducer from './app'

const rootReducers = combineReducers({
  app: appReducer,
})

export default rootReducers
