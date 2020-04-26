import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  // createSelector,
} from '@reduxjs/toolkit';
import io from 'socket.io-client';
import { normalize } from 'normalizr';
import { listMessages } from '../../schemas';
import api from '../../services';

const messagesAdaptor = createEntityAdapter();

const socket = io('http://localhost:5000', { transports: ['websocket', 'polling'] });

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  (requestData) => {
    api.messages.createMessage(requestData);
    socket.on('newMessage', (newMessage) => {
      return newMessage;
    });
    // const { data: { data: { attributes } } } = result;
    // return attributes;
  },
);

export const fetchMessage = createAsyncThunk(
  'messages/fetchMessage',
  async (requestData) => {
    const response = await api.messages.fetchMessages(requestData);
    const { data: { data } } = response;
    const normalized = normalize(data, listMessages);
    return normalized.entities;
  },
);

const slice = createSlice({
  name: 'messages',
  initialState: messagesAdaptor.getInitialState(),
  reducers: {},
  extraReducers: {
    [createMessage.fulfilled]: (state, { payload }) => {
      console.dir(payload);
      messagesAdaptor.addOne(state, payload);
    },
    [fetchMessage.fulfilled]: (state, { payload: { messages } }) => {
      messagesAdaptor.upsertMany(state, messages);
    },
  },
});

export const {
  selectById: selectMessageById,
  selectIds: selectMessageIds,
  selectEntities: selectMessageEntities,
  selectAll: selectAllMessages,
  selectTotal: selectTotalMessages,
} = messagesAdaptor.getSelectors((state) => state.messages);

const { reducer } = slice;

export default reducer;
