import RequestHelper from '../Utils/request-util';
import { AsyncStorage } from 'react-native';
class BaseAdapter {
    async getRequest (endpoint, params) {
        let url = await AsyncStorage.getItem("domain");
        return new RequestHelper('GET', url + endpoint, params);
    }

    getRequestBaseUrl (endpoint, params) {
        return new RequestHelper('GET', endpoint, params);
    }

    async postRequest (endpoint, params) {
        let url = await AsyncStorage.getItem("domain");
        return new RequestHelper('POST', url + endpoint, params);
    }

    async putRequest (endpoint, params) {
        let url = await AsyncStorage.getItem("domain");
        return new RequestHelper('PUT', url + endpoint, params);
    }

    async patchRequest (endpoint, params) {
        let url = await AsyncStorage.getItem("domain");
        return new RequestHelper('PATCH', url + endpoint, params);
    }

    async delateRequest (endpoint, params) {
        let url = await AsyncStorage.getItem("domain");
        return new RequestHelper('DELETE', url + endpoint, params);
    }
}

export default BaseAdapter;
