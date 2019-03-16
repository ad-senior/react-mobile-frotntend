import BaseAdapter from './BaseAdapter';
import {BASE_URL} from '../Config';

class ServiceUserAdapter extends BaseAdapter {
    static FetchServicerUser () {
        return this.prototype.getRequest(BASE_URL.SERVICE_USER, {});
    }
}

export default ServiceUserAdapter;
