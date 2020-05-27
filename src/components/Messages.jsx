import React from 'react';
import { useSelector } from 'react-redux';
import MessageInput from './MessageInput';
import selectors from '../selectors';

export default () => {
  const currentChannelId = useSelector(selectors.getCurrentChannelId);
  const messages = useSelector(selectors.selectMessagesByChannelId(currentChannelId));

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.map(({ id, text, name }) => (
            <div key={id}>
              <b>{name}</b>
              {`: ${text}`}
            </div>
          ))}
        </div>
        <MessageInput />
      </div>
    </div>
  );
};
