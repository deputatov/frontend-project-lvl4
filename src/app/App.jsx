import React from 'react';
import { useDispatch } from 'react-redux';

import io from 'socket.io-client';

import gon from 'gon';

import { fetchChannel, fetchData } from '../features/channels/channelsSlice';
import { createMessage, fetchMessages } from '../features/messages/messagesSlice';

import getName from '../lib/getName';

import CTX from '../ctx';

import Dashboard from './Dashboard';

const App = () => {
  const dispatch = useDispatch();

  const name = getName();

  const socket = io(process.env.PORT);
  // dispatch(fetchData(gon));
  // dispatch(fetchChannel());
  // dispatch(fetchMessages({ params: { channelId: 1 } }));

  socket.on('newMessage', (data) => dispatch(createMessage(data)));

  return (
    <div className="App">
      <CTX.Provider value={name}>
        <Dashboard />
      </CTX.Provider>
    </div>
  );
};

export default App;
