import LoginRedux from '../Redux/LoginRedux'
import LoginAdapter from '../Adapters/LoginAdapter';
import DailyRedux from '../Redux/DailyRedux'
import DailyAdapter from '../Adapters/DailyAdapter';

const Login = (userData, dispatch) => {
  LoginAdapter.Login(userData)
    .then(response => dispatch(LoginRedux.loginSuccess(response)))
    .catch( error => dispatch(LoginRedux.loginSuccess(error)))
}

const RefreshToken = (token, dispatch) => {
  LoginAdapter.RefreshToken(token)
    .then(response => dispatch(LoginRedux.getTokenSuccess(response)))
    .catch( error => dispatch(LoginRedux.getTokenSuccess(error)))
}

const PostPersonalCare = (dataObj, dispatch) => {
  DailyAdapter.PersonalCare(dataObj)
    .then(response => dispatch(DailyRedux.postSuccess(response)))
    .catch( error => dispatch(DailyRedux.postSuccess(error)))
}

export const EventDispatcher = {
  Login,
  PostPersonalCare
}
