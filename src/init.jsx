import gon from 'gon';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import { zipObject } from 'lodash';
import reducer, { actions } from './slices';
import getName from '../lib/getName';
import App from './components/App';
import Ctx from './Ctx';

const getPreloadedState = () => {
  const { channels, currentChannelId, messages } = gon;
  const channelIds = channels.map((c) => c.id);
  const channelsEntities = zipObject(channelIds, channels);
  const messagesIds = messages.map((m) => m.id);
  const messagesEntities = zipObject(messagesIds, messages);

  return {
    channels: {
      currentChannelId,
      ids: channelIds,
      entities: channelsEntities,
    },
    messages: {
      ids: messagesIds,
      entities: messagesEntities,
    },
  };
};

export default () => {
  const store = configureStore({
    reducer,
    preloadedState: getPreloadedState(),
  });

  const socket = io(process.env.PORT);

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
