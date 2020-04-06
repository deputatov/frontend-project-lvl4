import { schema } from 'normalizr';

const channelsEntity = new schema.Entity('channels');

const listChannels = [{ attributes: channelsEntity }];

// [{ attributes: attributesEntity }];

export default listChannels;
