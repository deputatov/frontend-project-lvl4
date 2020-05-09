import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { keys, pickBy } from 'lodash';
import gon from 'gon';
import getNormalizedData from '../../lib/getNormalizedData';

import { deleteChannel } from '../channels/channelsSlice';

const messagesAdaptor = createEntityAdapter();

const getInitialData = (data) => {
  const { messages } = data;
  const result = getNormalizedData(messages);
  return { ...result };
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdaptor.getInitialState({ ...getInitialData(gon) }),
  reducers: {
    createMessage(state, { payload: { data: { attributes } } }) {
      messagesAdaptor.addOne(state, attributes);
    },
  },
  extraReducers: {
    [deleteChannel]: (state, { payload: { data: { id } } }) => {
      const deletedMessages = keys(pickBy(state.entities, { channelId: id }));
      messagesAdaptor.removeMany(state, deletedMessages);
    },
  },
});

export const {
  selectAll: selectAllMessages,
} = messagesAdaptor.getSelectors((state) => state.messages);

export const selectMessagesByChannelId = (channelId) => (
  createSelector(
    [
      (state) => selectAllMessages(state),
    ],
    (messages) => messages.filter((message) => message.channelId === channelId),
  )
);

const { actions, reducer } = messagesSlice;

export const { createMessage } = actions;

export default reducer;
