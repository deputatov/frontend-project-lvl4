import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { asyncActions } from '../../slices/index.js';

export default ({ modalInfo: { channel }, hideModal }) => {
  const dispatch = useDispatch();

  const generateOnSubmit = ({ name }, { setSubmitting }) => {
    setSubmitting(true);
    const data = { params: { id: channel.id }, data: { attributes: { name } } };
    dispatch(asyncActions.renameChannel(data)).then(hideModal);
  };

  const f = useFormik({
    initialValues: { name: channel.name },
    onSubmit: generateOnSubmit,
    onReset: hideModal,
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, [null]);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={f.handleSubmit} onReset={f.handleReset}>
        <Modal.Body>
          <Form.Control
            autoFocus
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
          <Button variant="primary" type="submit" disabled={f.isSubmitting || !f.dirty}>Rename</Button>
          <Button variant="secondary" type="reset" disabled={f.isSubmitting}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
