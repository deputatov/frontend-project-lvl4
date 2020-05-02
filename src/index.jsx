import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './app/App';

const render = () => {
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};

render();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
