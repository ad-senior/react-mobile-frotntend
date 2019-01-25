import LoginRedux from '../Redux/LoginRedux'
import LoginAdapter from '../Adapters/LoginAdapter';
import DailyRedux from '../Redux/DailyRedux'
import DailyAdapter from '../Adapters/DailyAdapter';
import ServiceUserAdapter from '../Adapters/ServiceUserAdapter';
import ServiceUserRedux from '../Redux/ServiceUserRedex';
import { AsyncStorage } from 'react-native';

const refreshToken = async (dispatch) => {
  let tokenRefresh = await AsyncStorage.getItem('refresh').then(response => response)
  data = {'refresh': tokenRefresh}
  return LoginAdapter.RefreshToken(data)
    .then(async (response) => {
      if (response.access) {
        response.refresh = tokenRefresh;
        await AsyncStorage.setItem('token', userData.access);
      }
      return dispatch(LoginRedux.getTokenSuccess(response))
    })
    .catch( error => dispatch(LoginRedux.getTokenSuccess(error)))
}

const Login = (userData, dispatch) => {
  return LoginAdapter.Login(userData)
    .then(response => dispatch(LoginRedux.loginSuccess(response)))
    .catch(error => dispatch(LoginRedux.loginSuccess(error)))
}

const FetchServiceUser = (dispatch) => {
  return ServiceUserAdapter.FetchServicerUser()
    .then(response => dispatch(ServiceUserRedux.fetchUser(response)))
    .catch(error => dispatch(ServiceUserRedux.fetchUser(error)))
}

const FetchMood = (dispatch) => {
  DailyAdapter.Mood()
    .then(response => dispatch(DailyRedux.fetchMood(response)))
    .catch(error => dispatch(DailyRedux.fetchMood(error)))
}

const FetchMealMenu = (dispatch) => {
  DailyAdapter.MealMenu()
    .then(response => dispatch(DailyRedux.fetchMealMenu(response)))
    .catch(error => dispatch(DailyRedux.fetchMealMenu(error)))
}

const PostPersonalCare = async (dataObj, dispatch) => {
  await refreshToken(dispatch);
  return DailyAdapter.PersonalCare(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch(error => dispatch(DailyRedux.postSuccess(error)))
}

const PostMeal = async (dataObj, dispatch) => {
  await refreshToken(dispatch);
  return DailyAdapter.Meal(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch(error => dispatch(DailyRedux.postSuccess(error)))
}

const PostAccident = async (dataObj, dispatch) => {
  await refreshToken(dispatch);
  return DailyAdapter.Accident(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch(error => dispatch(DailyRedux.postSuccess(error)))
}

const PostActivity = async (dataObj, dispatch) => {
  await refreshToken(dispatch);
  return DailyAdapter.Activity(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch(error => dispatch(DailyRedux.postSuccess(error)))
}

const PostNightCheck = async (dataObj, dispatch) => {
  await refreshToken(dispatch);
  return DailyAdapter.NightCheck(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch(error => dispatch(DailyRedux.postSuccess(error)))
}

const PostContactLog = async (dataObj, dispatch) => {
  await refreshToken(dispatch);
  return DailyAdapter.ContactLog(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch(error => dispatch(DailyRedux.postSuccess(error)))
}

const PostMedication = async (dataObj, dispatch) => {
  await refreshToken(dispatch);
  return DailyAdapter.Medication(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch(error => dispatch(DailyRedux.postSuccess(error)))
}

const UpdateMedication = async (dataObj, dispatch) => {
  await refreshToken(dispatch);
  return DailyAdapter.UpdateMedication(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch(error => dispatch(DailyRedux.postSuccess(error)))
}

const PostHealth = async (dataObj, dispatch) => {
  await refreshToken(dispatch);
  return DailyAdapter.Health(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch(error => dispatch(DailyRedux.postSuccess(error)))
}

const FetchCarePlan = (dispatch) => {
  DailyAdapter.CarePlan()
    .then(response => dispatch(DailyRedux.fetchCarePlan(response)))
    .catch(error => dispatch(DailyRedux.fetchCarePlan(error)))
}

const FetchDaily = (dispatch) => dispatch(DailyRedux.fetchDaily())

const UpdateUser = (user, dispatch) => dispatch(ServiceUserRedux.updateUser(user))

export const EventDispatcher = {
  Login,
  FetchDaily,
  FetchMood,
  FetchMealMenu,
  UpdateUser,
  FetchServiceUser,
  PostPersonalCare,
  PostMeal,
  PostAccident,
  PostActivity,
  PostContactLog,
  PostHealth,
  PostNightCheck,
  PostMedication,
  UpdateMedication,
  FetchCarePlan
}
