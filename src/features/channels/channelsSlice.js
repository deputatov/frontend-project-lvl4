import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import channelEntity from '../../schemas';
import api from '../../services';

const channelsAdaptor = createEntityAdapter();

export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (data) => {
    const response = await api.channels.createChannel(data);
    return response;
  },
);

export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (data) => {
    const response = await api.channels.deleteChannle(data);
    return response;
  },
);

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await api.channels.fetchChannels();
    const { data: { data } } = response;
    const normalized = normalize(data, channelEntity);
    return normalized.entities;
  },
);

const slice = createSlice({
  name: 'channels',
  initialState: channelsAdaptor.getInitialState(),
  reducers: {},
  extraReducers: {
    [createChannel.fulfilled]: (state, action) => {
      channelsAdaptor.addOne(state, action.payload);
    },
    [fetchChannels.fulfilled]: (state, action) => {
      channelsAdaptor.addMany(state, action.payload.channels);
    },
    [deleteChannel.fulfilled]: (state, action) => {
      channelsAdaptor.removeOne(state, action.payload);
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
    (state) => state.messages.ids.map((id) => state.messages.entities[id]), //all messages
  ],
  (channel, messages) => Object
    .keys(messages)
    .map((c) => messages[c])
    .filter((message) => channel.messages.includes(message)),
);

const { reducer } = slice;

export default reducer;
