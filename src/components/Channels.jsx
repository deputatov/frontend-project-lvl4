import React from 'react';
// import routes from './routes';
import io from 'socket.io-client';
import axios from 'axios';
import routes from '../routes';

const getChannelsPath = () => {
  const socket = io('http://localhost:5000', { transports: ['websocket'] });
  // const dt = { data: { attributes: { name: 'NameThatIsNoticeable' } } };
  // const getNewChannel = async () => {
  //   const res = await axios.post(routes.channelsPath(), dt);
  //   console.dir(res);
  // };

  const getChannels = async () => {
    const res = await axios.get(routes.channelsPath());
    console.dir(res);
  };

  getChannels();

  // getNewChannel();

  socket.on('newChannel', (channel) => {
    // console.dir('you are here');
    console.dir(channel);
  });
  // const path = routes.channelsPath();
  // const fu = async () => {
  //   const response = await axios.get(path);
  //   console.log(response.data);
  // };
  // fu();
};

const Channels = ({ gon: { channels } }) => (
  <ul>
    {channels.map(({ name, id }) => <li key={id}>{name}</li>)}
    {getChannelsPath()}
  </ul>
);

export default Channels;
