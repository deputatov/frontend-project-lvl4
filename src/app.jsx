import gon from 'gon';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { actions } from './slices';
import getName from '../lib/getName';
import App from './components/App';
import Ctx from './Ctx';

const { channels, messages, currentChannelId } = gon;

export default () => {
  const store = configureStore({
    reducer,
  });

  store.dispatch(actions.initChannelsState({ channels, currentChannelId }));
  store.dispatch(actions.initMessagesState({ messages }));

  ReactDOM.render(
    <Provider store={store}>
      <Ctx.Provider value={{ name: getName() }}>
        <App />
      </Ctx.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
