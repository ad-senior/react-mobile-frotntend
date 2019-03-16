import RequestHelper from '../Utils/request-util';

class BaseAdapter {
    getRequest (endpoint, params) {
        return new RequestHelper('GET', endpoint, params);
    }

    postRequest (endpoint, params) {
        return new RequestHelper('POST', endpoint, params);
    }

    putRequest (endpoint, params) {
        return new RequestHelper('PUT', endpoint, params);
    }

    patchRequest (endpoint, params) {
        return new RequestHelper('PATCH', endpoint, params);
    }

    delateRequest (endpoint, params) {
        return new RequestHelper('DELETE', endpoint, params);
    }
}

export default BaseAdapter;
