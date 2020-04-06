import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './features/channels/channelsSlice';

export default configureStore({
  reducer: {
    channels: channelReducer,
  },
});
