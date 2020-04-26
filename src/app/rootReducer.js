import { combineReducers } from '@reduxjs/toolkit';

import channelsReducer from '../features/channels/channelsSlice';
import messagesReducer from '../features/messages/messagesSlice';

const rootReducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
});

export default rootReducer;
