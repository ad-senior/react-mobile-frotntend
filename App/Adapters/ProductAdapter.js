import BaseAdapter from ‘./BaseAdapter’;
import { API_URL } from ‘../config’;

class ProductAdapter extends BaseAdapter {
 static fetchCollection() {
   return this.prototype.getRequest(API_URL);
 }
}

export default ProductAdapter;
