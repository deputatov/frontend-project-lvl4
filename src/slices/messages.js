/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { filter } from 'lodash';
import axios from 'axios';
import routes from '../routes.js';
import { channelsActions } from './channels.js';

const adapter = createEntityAdapter();

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ currentChannelId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.channelMessagesPath(currentChannelId), data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

const slice = createSlice({
  name: 'messages',
  initialState: adapter.getInitialState(),
  reducers: {
    createMessage(state, { payload: { data: { attributes } } }) {
      adapter.addOne(state, attributes);
    },
  },
  extraReducers: {
    [channelsActions.deleteChannel]: (state, { payload: { data: { id } } }) => {
      const messages = filter(state.entities, (o) => o.channelId !== id);
      adapter.setAll(state, messages);
    },
  },
});

export const { selectAll: selectAllMessages } = adapter.getSelectors((state) => state.messages);

export const { actions: messagesActions } = slice;
export default slice.reducer;
