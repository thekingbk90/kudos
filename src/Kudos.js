import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from './configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ProductList from './views/ProductList';
import Products from './views/Products';
import Categories from './views/Categories';
import Product from './views/Product';
import Cart from './views/Cart';

import './index.css';

render(
<Provider store={store}>
    <HashRouter>
      <App>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/categories" component={Categories} />
          <Route path="/category/:categId" component={Products} />
          <Route path="/product/:productId" component={Product} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </App>
    </HashRouter>
</Provider>,
  document.getElementById('root'),
);

// registerServiceWorker();
