import requestHelper from '../Utils/request-util';

class BaseAdapter {
 /**
 * Make a GET request
 *
 * @param {string} [endpoint] - the API endpoint to use
 * @param {object} [params] - params to be sent
 * @return {Promise} a Promise that will resolve into an object or reject with
 *                   an error object for its reason
 */
 getRequest(endpoint, params) {
   return requestHelper('GET', endpoint, params);
 }

 postRequest(endpoint, params) {
   return requestHelper('POST', endpoint, params);
 }

 putRequest(endpoint, params) {
   return requestHelper('PUT', endpoint, params);
 }

 patchRequest(endpoint, params) {
   return requestHelper('PATCH', endpoint, params);
 }

 delateRequest(endpoint, params) {
   return requestHelper('DELETE', endpoint, params);
 }
}

export default BaseAdapter;
