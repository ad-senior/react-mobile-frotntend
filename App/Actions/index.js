import { Events } from '../Constants';
import ProductAdapter from '../Adapters/ProductAdapter';

const getProduct = (action) => {
 return (dispatch) => {
   ProductAdapter.fetchCollection()
   .then(response => {
     dispatch({ type: Events.PRODUCT_FETCH.SUCCESS, payload: response });
   })
   .catch(error => {
     dispatch({ type: Events.PRODUCT_FETCH.ERROR, payload: error });
   });
 }
}

export const EventDispatcher = {
 getProduct
}
