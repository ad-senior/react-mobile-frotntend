import BaseAdapter from './BaseAdapter';
//import { API_URL } from '../Config';

class ProductAdapter extends BaseAdapter {
 static fetchCollection() {
   //return this.prototype.getRequest(API_URL);
   return Promise.resolve({ success: true })
 }
}

export default ProductAdapter;
