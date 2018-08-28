import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  postSuccess: ['postSuccess'],
  fetchDaily: ['fetchDaily'],
  fetchMood: ['fetchMood'],
  fetchMealMenu: ['fetchMealMenu'],
  fetchCarePlan: ['fetchCarePlan']
})

export const DailyRedux = Types
export default Creators

export const INITIAL_STATE = Immutable({
  moods: {},
  menus: {},
  careplan: {},
  fetching: false,
  results: {},
  error: null
})

export const dataObj = (state,  payload) => {
  return state.merge({ fetching: true, results: payload.postSuccess })
}

export const fetchDaily = (state) => {
  return state.merge({ fetching: false })
}

export const fetchMood = (state, payload) => {
  return state.merge({ moods: payload.fetchMood })
}

export const fetchMealMenu = (state, payload) => {
  return state.merge({ menus: payload.fetchMealMenu })
}

export const fetchCarePlan= (state, payload) => {
  return state.merge({ careplan: payload.fetchCarePlan })
}

export const reducer = createReducer(INITIAL_STATE, {
  [DailyRedux.POST_SUCCESS]: dataObj,
  [DailyRedux.FETCH_DAILY]: fetchDaily,
  [DailyRedux.FETCH_MOOD]: fetchMood,
  [DailyRedux.FETCH_MEAL_MENU]: fetchMealMenu,
  [DailyRedux.FETCH_CARE_PLAN]: fetchCarePlan
})
