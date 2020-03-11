import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import Channels from './Channels';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <Channels gon={gon} />,
  document.getElementById('chat'),
);
