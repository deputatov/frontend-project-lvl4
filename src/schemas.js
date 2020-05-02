import { schema } from 'normalizr';

const channelsEntity = new schema.Entity('channels');

const messageEntity = new schema.Entity('messages');

export const listChannels = [{ attributes: channelsEntity }];

const entities = new schema.Entity('entities');

export const listChannels1 = [entities];

export const listMessages = [{ attributes: messageEntity }];
