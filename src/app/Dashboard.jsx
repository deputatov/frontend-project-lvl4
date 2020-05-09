import React from 'react';

import ChannelsList from '../features/channels/ChannelsList';
import ChannelListAddItem from '../features/channels/ChannelListAddItem';
import ChannelListRenameItem from '../features/channels/ChannelListRenameItem';
import ChannelListRemoveItem from '../features/channels/ChannelListRemoveItem';

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
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          <div>
            <b>Maurice.Wolff54</b>
            :
          </div>
          <div>
            <b>Maurice.Wolff54</b>
            : hjj
          </div>
          <div>
            <b>Maurice.Wolff54</b>
            : tyy
          </div>
          <div>
            <b>Kyla_VonRueden63</b>
            : лол
          </div>
        </div>
        <div className="mt-auto">
          <form noValidate="" className="">
            <div className="form-group">
              <div className="input-group">
                <input name="body" className="form-control" value="" />
                <div className="d-block invalid-feedback">&nbsp;</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
