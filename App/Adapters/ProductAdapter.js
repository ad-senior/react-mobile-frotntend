import BaseAdapter from './BaseAdapter';
import { BASE_URL } from '../Config';

class ProductAdapter extends BaseAdapter {
  static tryLogin(userData) {
    return this.prototype.postRequest(BASE_URL, userData);
    /*simple promise return*/
    // return Promise.resolve({ login: true , username: userData.username})
    // return Promise.reject({ login: false , error: 'Something went wrong!!'})
  }
}

export default ProductAdapter;
