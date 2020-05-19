import gon from 'gon';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import reducer, { actions } from './slices';
import getName from '../lib/getName';
import App from './components/App';
import Ctx from './Ctx';

const socket = io(process.env.PORT);

export default () => {
  const store = configureStore({
    reducer,
  });

  store.dispatch(actions.initState({ ...gon }));

  socket.on('newMessage', (data) => store.dispatch(actions.createMessage(data)));
  socket.on('newChannel', (data) => store.dispatch(actions.createChannel(data)));
  socket.on('renameChannel', (data) => store.dispatch(actions.updateChannel(data)));
  socket.on('removeChannel', (data) => store.dispatch(actions.deleteChannel(data)));

  ReactDOM.render(
    <Provider store={store}>
      <Ctx.Provider value={{ name: getName() }}>
        <App />
      </Ctx.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
