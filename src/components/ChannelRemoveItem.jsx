import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { asyncActions, selectors } from '../slices';

const ChannelRemoveItem = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const id = useSelector(selectors.getCurrentChannelId);
  const { name, removable } = useSelector((state) => selectors.selectChannelById(state, id));

  const handleRemoveChannel = () => {
    dispatch(asyncActions.removeChannel(id)).then(() => setOpenDialog(false));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        disabled={!removable}
        onClick={() => setOpenDialog(true)}
      >
        Remove channel
      </button>
      <Modal
        show={openDialog}
        onHide={() => setOpenDialog(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>{name}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenDialog(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRemoveChannel}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChannelRemoveItem;
