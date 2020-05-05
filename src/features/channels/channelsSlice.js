/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import gon from 'gon';
import getNormalizedData from '../../lib/getNormalizedData';
import routes from '../../routes';
import api from '../../api';

const channelsAdaptor = createEntityAdapter();

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

export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (requestData) => {
    const response = await api.channels.deleteChannel(requestData);
    if (response) {
      const { params: { id } } = requestData;
      return id;
    }
    return null;
  },
);

const getInitialData = (data) => {
  const { currentChannelId, channels } = data;
  const result = getNormalizedData(channels);
  return { ...result, currentChannelId };
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdaptor.getInitialState({ ...getInitialData(gon) }),
  reducers: {
    setCurrentChannelId(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
    createChannel(state, { payload: { data: { attributes } } }) {
      channelsAdaptor.addOne(state, attributes);
    },
    updateChannel(state, { payload: { data: { attributes } } }) {
      channelsAdaptor.upsertOne(state, attributes);
    },
    deleteChannel(state, { payload: { data: { attributes } } }) {
      channelsAdaptor.removeOne(state, attributes);
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
    [deleteChannel.fulfilled]: (state, { payload }) => {
      channelsAdaptor.removeOne(state, payload);
    },
  },
});

export const {
  selectById: selectChannelById,
  selectIds: selectChannelIds,
  selectEntities: selectChannelEntities,
  selectAll: selectAllChannels,
  selectTotal: selectTotalChannels,
} = channelsAdaptor.getSelectors((state) => state.channels);

const { reducer, actions } = channelsSlice;

export const {
  setCurrentChannelId,
  createChannel,
  updateChannel,
} = actions;

export default reducer;
