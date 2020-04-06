import React from 'react';

const ChannelDisplay = ({ name, removable }) => (
  <div>
    <span className="mr-auto">{name}</span>
    <button type="button" data-test="task-remove" className="close">
      {removable && <span>&times;</span>}
    </button>
  </div>
);

export default ChannelDisplay;
