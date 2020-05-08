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

const getInitialData = (data) => {
  const { currentChannelId, channels } = data;
  const currentChannelRemovable = channels[currentChannelId].removable;
  const result = getNormalizedData(channels);
  return { ...result, currentChannelId, currentChannelRemovable };
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdaptor.getInitialState({ ...getInitialData(gon) }),
  reducers: {
    setCurrentChannelIdRemovable(state, { payload: { id, removable } }) {
      state.currentChannelId = id;
      state.currentChannelRemovable = removable;
    },
    createChannel(state, { payload: { data: { attributes } } }) {
      channelsAdaptor.addOne(state, attributes);
      state.currentChannelId = attributes.id;
    },
    updateChannel(state, { payload: { data: { attributes } } }) {
      channelsAdaptor.upsertOne(state, attributes);
    },
    deleteChannel(state, { payload: { data: { id } } }) {
      channelsAdaptor.removeOne(state, id);
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

export const {
  selectAll: selectAllChannels,
} = channelsAdaptor.getSelectors((state) => state.channels);

const { reducer, actions } = channelsSlice;

export const {
  setCurrentChannelIdRemovable,
  createChannel,
  updateChannel,
  deleteChannel,
} = actions;

export default reducer;
