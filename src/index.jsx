import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
// import faker from 'faker';
// import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
// import Channels from './components/Channels';
// import openSocket from 'socket.io-client';
import store from './store';
import { fetchChannels } from './features/channels/channelsSlice';
import ArticleList from './features/channels/ChannelsList';
// import * as reducers from './reducers';

// const middleware = getDefaultMiddleware({
//   thunk: true,
//   immutableCheck: false,
//   serializableCheck: false,
// });

// export const store = configureStore({
//   reducer: { ...reducers },
//   middleware,
//   devTools: process.env.NODE_ENV !== 'production',
// });

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('chat'),
// );

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

store.dispatch(fetchChannels());

ReactDom.render(
  <Provider store={store}>
    <ArticleList />
  </Provider>,
  document.getElementById('chat'),
);
// render(
//   <Channels gon={gon} />,
//   document.getElementById('chat'),
// );
