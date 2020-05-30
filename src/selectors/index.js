import { createSelector } from '@reduxjs/toolkit';
import { selectAllChannels } from '../slices/channels.js';
import { selectAllMessages } from '../slices/messages.js';

const getCurrentChannelId = createSelector(
  (state) => state.channels.currentChannelId,
  (currentChannelId) => currentChannelId,
);

const selectMessagesByChannelId = (channelId) => (
  createSelector(
    [
      (state) => selectAllMessages(state),
    ],
    (messages) => messages.filter((message) => message.channelId === channelId),
  )
);

export default { selectAllChannels, getCurrentChannelId, selectMessagesByChannelId };
