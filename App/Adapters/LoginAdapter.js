import BaseAdapter from './BaseAdapter';
import {BASE_URL} from '../Config';
class LoginAdapter extends BaseAdapter {
    static Login (userData) {
        return this.prototype.postRequest(BASE_URL.TOKEN, userData);
    }

    static RefreshToken (token) {
        return this.prototype.postRequest(BASE_URL.REFRESH_TOKEN, token);
    }

    static BusinessAccounts () {
        return this.prototype.getRequestBaseUrl(BASE_URL.BUISNESS_ACCOUNT);
    }
}

export default LoginAdapter;
