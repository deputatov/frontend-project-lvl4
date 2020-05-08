import React from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import { Formik, Form } from 'formik';

import routes from '../../routes';

const ChannelDialogAddItem = ({ open, onClose }) => {
  const onSubmit = ({ text }, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    const data = { data: { attributes: { name: text } } };
    const url = routes.channelsPath();
    axios
      .post(url, data)
      .then(() => {
        resetForm({ text: '' });
        onClose();
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Modal show={open} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new channel</Modal.Title>
      </Modal.Header>
      <Formik initialValues={{ text: '' }} onSubmit={onSubmit}>
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
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button variant="primary" disabled={!dirty || isSubmitting}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ChannelDialogAddItem;
