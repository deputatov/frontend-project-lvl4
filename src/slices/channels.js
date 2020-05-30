/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { last } from 'lodash';
import axios from 'axios';
import routes from '../routes.js';

const adapter = createEntityAdapter();

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.channelsPath(), data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(routes.channelPath(id), data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const removeChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(routes.channelPath(id));
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
  name: 'channels',
  initialState: adapter.getInitialState(),
  reducers: {
    setCurrentChannelId(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
    createChannel(state, { payload: { data: { attributes } } }) {
      adapter.addOne(state, attributes);
      state.currentChannelId = attributes.id;
    },
    updateChannel(state, { payload: { data: { attributes } } }) {
      adapter.upsertOne(state, attributes);
    },
    deleteChannel(state, { payload: { data: { id } } }) {
      adapter.removeOne(state, id);
      state.currentChannelId = last(state.ids);
    },
  },
});

export const { selectAll: selectAllChannels } = adapter.getSelectors((state) => state.channels);

export const { actions: channelsActions } = slice;
export default slice.reducer;
