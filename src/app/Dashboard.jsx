import React from 'react';

import ChannelsList from '../features/channels/ChannelsList';

const Dashboard = () => (
  <div>
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
        </div>
        <ChannelsList />
      </div>
    </div>
  </div>
);

export default Dashboard;
