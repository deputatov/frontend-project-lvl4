import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import getModal from './modals/index.js';
import selectors from '../selectors/index.js';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} hideModal={hideModal} />;
};

export default () => {
  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });
  const currentChannelId = useSelector(selectors.getCurrentChannelId);

  const showModal = (type, channel = null) => setModalInfo({ type, channel });
  const hideModal = () => setModalInfo({ type: null, channel: null });

  return (
    <div className="row h-100 pb-3">
      <Channels showModal={showModal} currentChannelId={currentChannelId} />
      <Messages currentChannelId={currentChannelId} />
      {renderModal({ modalInfo, hideModal })}
    </div>
  );
};
