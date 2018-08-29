import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  loginSuccess: ['loginSuccess'],
  getTokenSuccess: ['getTokenSuccess']
})

export const LoginRedux = Types
export default Creators

export const INITIAL_STATE = Immutable({
  user_id: null,
  fetching: false,
  results: {},
  error: null
})

export const userData = (state,  payload) => {
  return state.merge({ fetching: true, results: payload.loginSuccess, user_id: payload.loginSuccess.user_id })
}

export const token = (state, payload) => {
  return state.merge({ fetching: true })
}

export const reducer = createReducer(INITIAL_STATE, {
  [LoginRedux.LOGIN_SUCCESS]: userData,
  [LoginRedux.GET_TOKEN_SUCCESS]: token
})
