import request from 'axios';

export default function(method, endpoint, requestionOption = {}) {
 const requestConfig = {
   method: method,
   url: endpoint
 };

 return request(requestConfig, requestionOption)
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
