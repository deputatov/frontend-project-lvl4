import React from 'react';
import { useSelector } from 'react-redux';
import MessageInput from './MessageInput.jsx';
import selectors from '../selectors/index.js';

export default () => {
  const currentChannelId = useSelector(selectors.getCurrentChannelId);
  const messages = useSelector(selectors.selectMessagesByChannelId(currentChannelId));

  const renderMessage = ({ id, text, name }) => (
    <div key={id}>
      <span className="mr-1 font-weight-bold">
        {name}
        :
      </span>
      <span>{text}</span>
    </div>
  );

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.map(renderMessage)}
        </div>
        <MessageInput />
      </div>
    </div>
  );
};
