import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { keys, pickBy } from 'lodash';
import gon from 'gon';
import getNormalizedData from '../../lib/getNormalizedData';
import { actions as channelsActions } from './channels';

const adapter = createEntityAdapter();

const getInitialData = (data) => {
  const { messages } = data;
  const result = getNormalizedData(messages);
  return { ...result };
};

const slice = createSlice({
  name: 'messages',
  initialState: adapter.getInitialState({ ...getInitialData(gon) }),
  reducers: {
    createMessage(state, { payload: { data: { attributes } } }) {
      adapter.addOne(state, attributes);
    },
  },
  extraReducers: {
    [channelsActions.deleteChannel]: (state, { payload: { data: { id } } }) => {
      const messages = keys(pickBy(state.entities, { channelId: id }));
      adapter.removeMany(state, messages);
    },
  },
});

const { selectAll } = adapter.getSelectors((state) => state.messages);

export const selectMessagesByChannelId = (channelId) => (
  createSelector(
    [
      (state) => selectAll(state),
    ],
    (messages) => messages.filter((message) => message.channelId === channelId),
  )
);

export const { actions, reducer: messages } = slice;
