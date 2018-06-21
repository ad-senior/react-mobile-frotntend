import BaseAdapter from './BaseAdapter';
import { BASE_URL } from '../Config';

class LoginAdapter extends BaseAdapter {
  static Login(userData) {
    return this.prototype.postRequest(BASE_URL.TOKEN, userData);
  }
}

export default LoginAdapter;
