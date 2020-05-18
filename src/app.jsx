import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices';
import getName from '../lib/getName';
import App from './components/App';
import Ctx from './ctx';

export default () => {
  const store = configureStore({
    reducer,
  });

  ReactDOM.render(
    <Provider store={store}>
      <Ctx.Provider value={{ name: getName() }}>
        <App />
      </Ctx.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
