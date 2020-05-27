import React, { useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import axios from 'axios';
import routes from '../../routes.js';

const generateOnSubmit = (props) => (values, formikProps) => {
  const { hideModal } = props;
  const { setSubmitting } = formikProps;
  const { name } = values;

  setSubmitting(true);
  const data = { data: { attributes: { name } } };
  const url = routes.channelsPath();
  axios
    .post(url, data)
    .then(() => {
      hideModal();
    })
    .catch((err) => {
      throw err;
    });
};

export default (props) => {
  const { hideModal } = props;

  const f = useFormik({
    initialValues: { name: '' },
    onSubmit: generateOnSubmit(props),
    onReset: () => hideModal(),
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add new channel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={f.handleSubmit} onReset={f.handleReset}>
        <Modal.Body>
          <Form.Control
            required
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            value={f.values.name}
            name="name"
            type="text"
            ref={inputRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" disabled={f.isSubmitting}>Add</Button>
          <Button variant="secondary" type="reset" disabled={f.isSubmitting}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
