/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
// import { normalize } from 'normalizr';
import gon from 'gon';
import getNormalizedData from '../../lib/getNormalizedData';
import api from '../../api';

const channelsAdaptor = createEntityAdapter();

export const updateChannel = createAsyncThunk(
  'channels/updateChannel',
  async (requestData) => {
    const response = await api.channels.updateChannel(requestData);
    const { data: { data: { attributes } } } = response;
    return attributes;
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
  },
  extraReducers: {
    // [createChannel.fulfilled]: (state, { payload }) => {
    //   channelsAdaptor.addOne(state, payload);
    // },
    [updateChannel.fulfilled]: (state, { payload }) => {
      channelsAdaptor.upsertOne(state, payload);
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

export const { setCurrentChannelId, createChannel } = actions;

export default reducer;
