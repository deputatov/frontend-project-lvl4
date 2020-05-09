import React from 'react';

import ChannelsList from '../features/channels/ChannelsList';
import ChannelListAddItem from '../features/channels/ChannelListAddItem';
import ChannelListRenameItem from '../features/channels/ChannelListRenameItem';
import ChannelListRemoveItem from '../features/channels/ChannelListRemoveItem';
import MessagesList from '../features/messages/MessagesList';
import MessageInput from '../features/messages/MessageInput';

const Dashboard = () => (
  <div className="row h-100 pb-3">
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
      </div>
      <ChannelsList />
      <div className="nav flex-column nav-pills nav-fill mt-2">
        <ChannelListAddItem />
        <ChannelListRenameItem />
        <ChannelListRemoveItem />
      </div>
    </div>
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <MessagesList />
        <MessageInput />
      </div>
    </div>
  </div>
);

export default Dashboard;
