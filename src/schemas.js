import { schema } from 'normalizr';

const channelsEntity = new schema.Entity('channels');

const messageEntity = new schema.Entity('messages');

export const listChannels = [{ attributes: channelsEntity }];

export const listMessages = [{ attributes: messageEntity }];
