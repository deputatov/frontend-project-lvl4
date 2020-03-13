import React from 'react';

const Channels = ({ gon: { channels } }) => (
  <ul>
    {channels.map(({ name, id }) => <li key={id}>{name}</li>)}
  </ul>
);

export default Channels;
