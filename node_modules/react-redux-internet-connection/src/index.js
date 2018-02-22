import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import Store from './store';
import registerServiceWorker from './registerServiceWorker';


const StoreInstance = Store();

ReactDOM.render(
  <Provider store={StoreInstance}>
    <App />
  </Provider>,
 document.getElementById('root')
);
registerServiceWorker();
