import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { filter } from 'lodash';
import { actions as channelsActions } from './channels';

const adapter = createEntityAdapter();

const slice = createSlice({
  name: 'messages',
  initialState: adapter.getInitialState(),
  reducers: {
    createMessage(state, { payload: { data: { attributes } } }) {
      adapter.addOne(state, attributes);
    },
  },
  extraReducers: {
    [channelsActions.initState]: (state, { payload: { messages } }) => {
      adapter.addMany(state, messages);
    },
    [channelsActions.deleteChannel]: (state, { payload: { data: { id } } }) => {
      const messages = filter(state.entities, (o) => o.channelId !== id);
      adapter.setAll(state, messages);
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
