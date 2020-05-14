import { combineReducers } from '@reduxjs/toolkit';

import {
  messages,
  actions as messagesActions,
  selectMessagesByChannelId,
} from './messages';

import {
  channels,
  renameChannel,
  removeChannel,
  actions as channelsActions,
  selectAllChannels,
  selectChannelById,
  getCurrentChannelId,
} from './channels';

export default combineReducers({
  channels,
  messages,
});

export const actions = {
  ...messagesActions,
  ...channelsActions,
};

export const asyncActions = {
  renameChannel,
  removeChannel,
};

export const selectors = {
  selectAllChannels,
  selectChannelById,
  getCurrentChannelId,
  selectMessagesByChannelId,
};