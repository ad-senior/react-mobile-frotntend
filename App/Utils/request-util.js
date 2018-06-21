import request from 'axios';

export default function(method, endpoint, params={}) {
  const requestConfig = {
    method: method,
    url: endpoint,
    data: params
  };

  return request(requestConfig)
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
      console.error(`[API][${method}][${endpoint}]`, error.status, error.data);

      throw error;
    });
}
