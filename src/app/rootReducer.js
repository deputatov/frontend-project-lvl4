import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer from '../slices/channels';
import messagesReducer from '../slices/messages';

const rootReducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
});

export default rootReducer;
