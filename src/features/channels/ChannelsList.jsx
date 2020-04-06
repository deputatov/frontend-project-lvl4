import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllChannels } from './channelsSlice';
import ChannlelDisplay from './ChannelDisplay';

const ChannelsList = () => {
  const channels = useSelector(selectAllChannels);
  return (
    <ul className="list-group">
      {channels.map(({ id, name, removable }) => (
        <li key={id} className="list-group-item d-flex">
          <ChannlelDisplay name={name} removable={removable} />
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
