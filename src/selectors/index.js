import { createSelector } from '@reduxjs/toolkit';
import { selectAllChannels } from '../slices/channels';
import { selectAllMessages } from '../slices/messages';

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
