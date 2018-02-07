import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products,
});

export const fetchProducts = (params) => (dispatch) => {
  dispatch(requestProducts());
  let url;
  if(params) {
      url =
          config.API_PRODUCT_URL + '&session=' + config.API_SESSIONL +
          '&' +
          Object.keys(params)
              .map(k => k + '=' + encodeURIComponent(params[k]))
              .join('&');

  } else {
      url = config.API_PRODUCT_URL + '&session=' + config.API_SESSION;
  }
  return fetch(url)
    .then(
        response => {
            var data = response.json();
            var promiseData = Promise.resolve(data);
            var items = {};
            promiseData.then(function(value) {
                if(value.items !== undefined) {
                    items = value.items;
                }
                return items;
            }).then(
                json => dispatch(receiveProducts(json))
            ).catch(() => {
                dispatch(receiveProducts([]));
            });
        }
    )
    .catch(() => {
      dispatch(receiveProducts([]));
    });
};
