/* eslint arrow-parens: ["error", "as-needed"] */
/* eslint-env es6 */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import gon from 'gon';
import { normalize } from 'normalizr';
import { listMessages } from '../../schemas';
// import routes from '../../routes';
import getNormalizedData from '../../lib/getNormalizedData';
import api from '../../services';

const messagesAdaptor = createEntityAdapter();

// export const fetchMessages = createAsyncThunk(
//   'messages/fetchMessages',
//   async requestData => {
//     const response = await api.messages.fetchMessages(requestData);
//     const { data: { data } } = response;
//     const normalized = normalize(data, listMessages);
//     return normalized.entities;
//   },
// );

const getInitialData = data => {
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
    // [fetchMessages.fulfilled]: (state, { payload: { messages } }) => {
    //   messagesAdaptor.upsertMany(state, messages);
    // },
  },
});

export const {
  selectById: selectMessagesById,
  selectIds: selectMessageIds,
  selectEntities: selectMessageEntities,
  selectAll: selectAllMessages,
  selectTotal: selectTotalMessages,
} = messagesAdaptor.getSelectors(state => state.messages);

export const selectMessagesByChannelId = channelId => (
  createSelector(
    [
      state => selectAllMessages(state),
    ],
    messages => messages.filter(message => message.channelId === channelId),
  )
);

const { actions, reducer } = messagesSlice;

export const { createMessage } = actions;

export default reducer;
