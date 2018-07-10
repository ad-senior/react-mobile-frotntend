import request from 'axios';
import { AsyncStorage, Alert } from 'react-native';

export default class requestHelper {
  constructor(method, endpoint, params){
    this.requestConfig = {
      method: method,
      url: endpoint,
      data: params
    };

    return this.sendRequest();
  }

  setErrorMessage = (error) => {
    let message = 'Invalid status';
    let data = error.data;
    if(data.non_field_errors){
      message = data.non_field_errors[0]
    }else if(data.code === 'token_not_valid'){
      message = data.detail
    }
    return {error: true, message: message, status: error.status}
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
        //console.error(`[API][${this.method}][${this.endpoint}]`, error.status, error.data);
        return this.setErrorMessage(error);
      });
  }
}