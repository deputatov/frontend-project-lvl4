import React from 'react';

const Channels = ({ gon: { channels } }) => (
  <lu>
    {channels.map(({ name, id }) => <li key={id}>{name}</li>)}
  </lu>
);

export default Channels;
