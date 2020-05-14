import React from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { createMessage } from '../slices/messages';
import { createChannel, updateChannel, deleteChannel } from '../slices/channels';
import getName from '../../lib/getName';
import CTX from '../ctx';
import Dashboard from './Dashboard';

const App = () => {
  const dispatch = useDispatch();
  const socket = io(process.env.PORT);
  socket.on('newMessage', (data) => dispatch(createMessage(data)));
  socket.on('newChannel', (data) => dispatch(createChannel(data)));
  socket.on('renameChannel', (data) => dispatch(updateChannel(data)));
  socket.on('removeChannel', (data) => dispatch(deleteChannel(data)));
  return (
    <CTX.Provider value={{ nickname: getName() }}>
      <Dashboard />
    </CTX.Provider>
  );
};

export default App;
