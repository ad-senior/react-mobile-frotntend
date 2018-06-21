import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  loginSuccess: ['loginSuccess']
})

export const LoginRedux = Types
export default Creators

export const INITIAL_STATE = Immutable({
  fetching: false,
  results: {},
  error: null
})

export const userData = (state,  payload) => {
  return state.merge({ fetching: true, results: payload.loginSuccess })
}

export const reducer = createReducer(INITIAL_STATE, {
  [LoginRedux.LOGIN_SUCCESS]: userData
})
