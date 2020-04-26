import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchChannel } from '../features/channels/channelsSlice';
import { fetchMessage } from '../features/messages/messagesSlice';
import Dashboard from './Dashboard';

const App = () => {
  const dispatch = useDispatch();
  dispatch(fetchChannel());
  dispatch(fetchMessage({ params: { channelId: 1 } }));
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
};

export default App;
