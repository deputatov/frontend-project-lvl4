import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { head, keys } from 'lodash';
import { listChannels } from '../../schemas';
import api from '../../api';

const channelsAdaptor = createEntityAdapter();

export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (requestData) => {
    const response = await api.channels.createChannel(requestData);
    const { data: { data: { attributes } } } = response;
    return attributes;
  },
);

export const fetchChannel = createAsyncThunk(
  'channels/fetchChannel',
  async () => {
    const response = await api.channels.fetchChannels();
    const { data: { data } } = response;
    const normalized = normalize(data, listChannels);
    return normalized.entities;
  },
);

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

const slice = createSlice({
  name: 'channels',
  initialState: channelsAdaptor.getInitialState(),
  reducers: {},
  extraReducers: {
    [createChannel.fulfilled]: (state, { payload }) => {
      channelsAdaptor.addOne(state, payload);
    },
    [fetchChannel.fulfilled]: (state, { payload: { channels } }) => {
      channelsAdaptor.upsertMany(state, channels);
      state.currentChannelId = head(keys(channels));
    },
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

export const selectMessagesByChannelId = (channelId) => createSelector(
  [
    (state) => selectChannelById(state, channelId),
    (state) => state.messages.ids.map((id) => state.messages.entities[id]),
  ],
  (channel, messages) => Object
    .keys(messages)
    .map((c) => messages[c])
    .filter((message) => channel.messages.includes(message)),
);

const { reducer } = slice;

export const { setCurrentChannelId } = slice.actions;

export default reducer;
