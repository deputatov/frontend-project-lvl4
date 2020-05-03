import React from 'react';
import { useDispatch } from 'react-redux';

import io from 'socket.io-client';

import { createMessage } from '../features/messages/messagesSlice';

import { createChannel } from '../features/channels/channelsSlice';

import getName from '../lib/getName';

import CTX from '../ctx';

import Dashboard from './Dashboard';

const App = () => {
  const dispatch = useDispatch();

  const name = getName();

  const socket = io(process.env.PORT);

  socket.on('newMessage', (data) => dispatch(createMessage(data)));
  socket.on('newChannel', (data) => dispatch(createChannel(data)));
  socket.on('renameChannel', (data) => console.dir(data));
  socket.on('removeChannel', (data) => console.dir(data));

  return (
    <div className="App">
      <CTX.Provider value={name}>
        <Dashboard />
      </CTX.Provider>
    </div>
  );
};

export default App;
