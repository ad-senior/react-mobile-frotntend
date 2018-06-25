import request from 'axios';
import { AsyncStorage } from 'react-native';

export default class requestHelper {
  constructor(method, endpoint, params){
    this.requestConfig = {
      method: method,
      url: endpoint,
      data: params
    };

    return this.sendRequest();
  }

  sendRequest = async () => {
    let tokenString = await AsyncStorage.getItem('token').then(response => response)
    this.requestConfig.headers = {Authorization: `Bearer ${tokenString}`};
    return request(this.requestConfig)
      .then(response => {
        try {
          return response.data;
        } catch (error) {
          return Promise.reject({
            data: {
              error: [{
                status: 0,
                detail: 'Something went wrong, please contact us'
              }]
            }
          });
        }
      })
      .catch(response => {
        let error = {...response}.response;
        console.error(`[API][${this.method}][${this.endpoint}]`, error.status, error.data);
        throw error;
      });
  }
}
