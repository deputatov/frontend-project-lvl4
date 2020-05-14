import React from 'react';
import { useSelector } from 'react-redux';

import { selectMessagesByChannelId } from '../../slices/messages';

const MessagesList = () => {
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector(selectMessagesByChannelId(channelId));

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map(({ id, text, nickname }) => (
        <div key={id}>
          <b>
            {nickname}
          </b>
          {`: ${text}`}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
