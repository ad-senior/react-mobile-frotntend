import { Events } from '../Constants';

const initialState = {
  fetched: false,
  productList: [],
  error: null
};

const products = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Events.PRODUCT_FETCH.SUCCESS:
      return { ...state, fetched: true, productList: payload };
    case Events.PRODUCT_FETCH.ERROR:
      return { ...state, fetched: false, error: payload };
    default:
      return state;
  }
};

export default products;
