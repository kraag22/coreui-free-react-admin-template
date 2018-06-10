import { handleActions } from 'redux-actions'
import * as action from './actions'

export const initialState = { employees: [] }

const handlers = {
  [action.GET_EMPLOYEES]: (state, action) => ({
    ...state,
    employees: action.payload
  }),
  [action.ADD_EMPLOYEE]: (state, action) => {

    const updateEmployees = state.employees.slice(0)
    updateEmployees.push(action.payload)
    return {...state, employees: updateEmployees}
  }
}

export default handleActions(handlers, initialState)
