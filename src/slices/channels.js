/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { last } from 'lodash';
import axios from 'axios';
import routes from '../routes';

const adapter = createEntityAdapter();

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async (data) => {
    const { params: { id } } = data;
    await axios.patch(routes.channelPath(id), data);
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    await axios.delete(routes.channelPath(id));
  },
);

const slice = createSlice({
  name: 'channels',
  initialState: adapter.getInitialState({ currentChannelId: null }),
  reducers: {
    initChannelsState(state, { payload: { channels, currentChannelId } }) {
      state.currentChannelId = currentChannelId;
      adapter.addMany(state, channels);
    },
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
  extraReducers: {
    [renameChannel.pending]: (state) => {
      state.renameChannel = 'request';
    },
    [renameChannel.fulfilled]: (state) => {
      state.renameChannel = 'success';
    },
    [renameChannel.rejected]: (state) => {
      state.renameChannel = 'failure';
    },
    [removeChannel.pending]: (state) => {
      state.removeChannel = 'request';
    },
    [removeChannel.fulfilled]: (state) => {
      state.removeChannel = 'success';
    },
    [removeChannel.rejected]: (state) => {
      state.removedChannel = 'failure';
    },
  },
});

const {
  selectAll: selectAllChannels,
  selectById: selectChannelById,
} = adapter.getSelectors((state) => state.channels);

const getCurrentChannelId = createSelector(
  (state) => state.channels.currentChannelId,
  (currentChannelId) => currentChannelId,
);

export const selectors = { selectAllChannels, selectChannelById, getCurrentChannelId };

export const { actions, reducer: channels } = slice;
