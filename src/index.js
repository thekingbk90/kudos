import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login';
import './index.css';

render(
  <Login/>,
  document.getElementById('root'),
);

registerServiceWorker();
