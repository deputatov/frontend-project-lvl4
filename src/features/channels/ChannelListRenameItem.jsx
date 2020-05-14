import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { Formik, Form } from 'formik';
import { renameChannel, selectChannelById } from '../../slices/channels';

const ChannelListRenameItem = () => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);

  const id = useSelector((state) => state.channels.currentChannelId);

  const { name, removable } = useSelector((state) => selectChannelById(state, id));

  const onSubmit = ({ text }, { setSubmitting }) => {
    setSubmitting(true);
    const data = { params: { id }, data: { attributes: { name: text } } };
    dispatch(renameChannel(data)).then(() => setOpenDialog(false));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary mb-2"
        disabled={!removable}
        onClick={() => setOpenDialog(true)}
      >
        Rename channel
      </button>
      <Modal
        show={openDialog}
        onHide={() => setOpenDialog(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Formik initialValues={{ text: name }} onSubmit={onSubmit}>
          {(props) => {
            const {
              dirty,
              values,
              handleBlur,
              handleSubmit,
              handleChange,
              isSubmitting,
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <FormControl
                    autoFocus
                    name="text"
                    value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="dense"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setOpenDialog(false)}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" disabled={!dirty || isSubmitting}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default ChannelListRenameItem;
