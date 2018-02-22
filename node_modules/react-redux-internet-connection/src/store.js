import { createStore, compose } from 'redux';
import rootReducer from './reducers';

const enhancers = [
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension() : f => f,
];

export default function (initialState) {
  return createStore(rootReducer, initialState, compose(...enhancers));
}
