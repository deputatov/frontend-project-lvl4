import { combineReducers } from '@reduxjs/toolkit';

import messages, {
  actions as messagesActions,
} from './messages';

import channels, {
  renameChannel,
  removeChannel,
  actions as channelsActions,
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
