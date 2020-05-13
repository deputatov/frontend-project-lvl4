import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { Formik, Form } from 'formik';
import routes from '../../routes';

const ChannelListAddItem = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = ({ text }, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    const data = { data: { attributes: { name: text } } };
    const url = routes.channelsPath();
    axios
      .post(url, data)
      .then(() => {
        resetForm({ text: '' });
        setOpenDialog(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary mb-2"
        onClick={() => setOpenDialog(true)}
      >
        + Add a channel
      </button>
      <Modal
        show={openDialog}
        onHide={() => setOpenDialog(false)}
        animation={false}
      >
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
                  <Button variant="secondary" onClick={() => setOpenDialog(false)}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" disabled={!dirty || isSubmitting}>
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

export default ChannelListAddItem;
