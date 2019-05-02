import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';


const { Types, Creators } = createActions({
	postSuccess: ['postSuccess'],
	postFail: ['postFail'],
	fetchDaily: ['fetchDaily'],
	fetchMood: ['fetchMood'],
	fetchMoodFail: ['fetchMoodFail'],
	fetchMealMenu: ['fetchMealMenu'],
	cleanCalendar: null,
	fetchCalendar: ['calendar'],
	fetchCalendarFail: ['err'],
	fetchCarePlan: ['fetchCarePlan'],
});

export const DailyRedux = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
	moods: {},
	menus: {},
	careplan: {},
	fetching: false,
	results: {},
	error: null,
	calendar: []
});

export const dataObj = (state, payload) => {
	return state.merge({ fetching: true, results: payload.postSuccess });
};

export const dataObjFail = (state, payload) => {
	return state.merge({ fetching: true, error: payload });
};

export const fetchDaily = (state) => {
	return state.merge({ fetching: false });
};

export const fetchMood = (state, payload) => {
	return state.merge({ moods: payload.fetchMood });
};

export const fetchMoodFail = (state) => {
	return state.merge({ moods: [] });
};

export const fetchMealMenu = (state, payload) => {
	return state.merge({ menus: payload.fetchMealMenu });
};

export const fetchCarePlan = (state, payload) => {
	return state.merge({ careplan: payload.fetchCarePlan });
};

export const fetchCalendar = (state, payload) => {
	console.log("eeee" + JSON.stringify(payload))
	return state.merge({ calendar: payload.calendar });
};

export const fetchCalendarFail = (state, payload) => {
	return state.merge({ calendar: [] });
};

export const cleanCalendar = (state, payload) => state.merge({ calendar: [] });

export const reducer = createReducer(INITIAL_STATE, {
	[DailyRedux.POST_SUCCESS]: dataObj,
	[DailyRedux.POST_FAIL]: dataObjFail,
	[DailyRedux.FETCH_DAILY]: fetchDaily,
	[DailyRedux.FETCH_MOOD]: fetchMood,
	[DailyRedux.FETCH_CALENDAR]: fetchCalendar,
	[DailyRedux.FETCH_CALENDAR_FAIL]: fetchCalendarFail,
	[DailyRedux.FETCH_MOOD_FAIL]: fetchMoodFail,
	[DailyRedux.FETCH_MEAL_MENU]: fetchMealMenu,
	[DailyRedux.FETCH_CARE_PLAN]: fetchCarePlan,
	[DailyRedux.CLEAN_CALENDAR]: cleanCalendar,
});
