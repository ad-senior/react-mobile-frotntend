import LoginRedux from '../Redux/LoginRedux'
import ProductAdapter from "../Adapters/ProductAdapter";

const Login = (userData, dispatch) => {
  ProductAdapter.tryLogin(userData)
    .then(response => dispatch(LoginRedux.loginSuccess(response)))
    .catch( error => dispatch(LoginRedux.loginSuccess(error)))
}

export const EventDispatcher = {
  Login
}