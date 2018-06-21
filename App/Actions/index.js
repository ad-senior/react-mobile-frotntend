import LoginRedux from '../Redux/LoginRedux'
import LoginAdapter from '../Adapters/LoginAdapter';

const Login = (userData, dispatch) => {
  LoginAdapter.Login(userData)
    .then(response => dispatch(LoginRedux.loginSuccess(response)))
    .catch( error => dispatch(LoginRedux.loginSuccess(error)))
}

export const EventDispatcher = {
  Login
}
