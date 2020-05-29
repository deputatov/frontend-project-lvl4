import React, { useState } from 'react';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import getModal from './modals/index.js';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} hideModal={hideModal} />;
};

export default () => {
  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });

  const showModal = (type, channel = null) => setModalInfo({ type, channel });

  const hideModal = () => setModalInfo({ type: null, channel: null });

  return (
    <div className="row h-100 pb-3">
      <Channels showModal={showModal} />
      <Messages />
      { renderModal({ modalInfo, hideModal }) }
    </div>
  );
};
