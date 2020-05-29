import { combineReducers } from '@reduxjs/toolkit';
import messages, { addMessage, messagesActions } from './messages.js';
import channels, {
  addChannel,
  renameChannel,
  removeChannel,
  channelsActions,
} from './channels.js';

export default combineReducers({ channels, messages });

export const actions = { ...messagesActions, ...channelsActions };

export const asyncActions = {
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
};
