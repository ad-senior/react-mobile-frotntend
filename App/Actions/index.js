import LoginRedux from '../Redux/LoginRedux'
import LoginAdapter from '../Adapters/LoginAdapter';
import DailyRedux from '../Redux/DailyRedux'
import DailyAdapter from '../Adapters/DailyAdapter';
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
  LoginAdapter.Login(userData)
    .then(response => dispatch(LoginRedux.loginSuccess(response)))
    .catch( error => dispatch(LoginRedux.loginSuccess(error)))
}

const PostPersonalCare = async (dataObj, dispatch) => {
  await refreshToken(dispatch);
  await DailyAdapter.PersonalCare(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch( error => dispatch(DailyRedux.postSuccess(error)))
}

export const EventDispatcher = {
  Login,
  PostPersonalCare
}
