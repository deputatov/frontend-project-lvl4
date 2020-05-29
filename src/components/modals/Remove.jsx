import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { asyncActions } from '../../slices/index.js';

export default ({ modalInfo: { channel }, hideModal }) => {
  const dispatch = useDispatch();

  const handleRemoveChannel = () => {
    dispatch(asyncActions.removeChannel(channel.id)).then(hideModal);
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>{channel.name}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleRemoveChannel}>Remove</Button>
        <Button variant="secondary" onClick={hideModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};
