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
  selectors as channelsSelectors,
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
  ...channelsSelectors,
  selectMessagesByChannelId,
};
