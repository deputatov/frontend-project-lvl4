import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { asyncActions } from '../../slices/index.js';

export default ({ hideModal }) => {
  const dispatch = useDispatch();

  const initialValues = { name: '' };

  const onSubmit = async (values, actions) => {
    const { addChannel } = asyncActions;
    const data = { data: { attributes: { name: values.name } } };
    const resultAction = await dispatch(addChannel(data));
    if (addChannel.fulfilled.match(resultAction)) {
      actions.setSubmitting(false);
      hideModal();
      return;
    }
    const { message } = resultAction.error;
    actions.setErrors({ message });
  };

  const f = useFormik({ initialValues, onSubmit, onReset: () => hideModal() });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add new channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit} onReset={f.handleReset}>
          <Form.Group>
            <Form.Control
              required
              name="name"
              type="text"
              value={f.values.name}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              isInvalid={!!f.errors.message}
              disabled={f.isSubmitting}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {f.errors.message}
              &nbsp;
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={f.isSubmitting}>Add</Button>
          <Button variant="secondary" type="reset" disabled={f.isSubmitting}>Cancel</Button>
        </Form>
      </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" type="submit" disabled={f.isSubmitting}>Add</Button>
          <Button variant="secondary" type="reset" disabled={f.isSubmitting}>Cancel</Button>
        </Modal.Footer> */}
    </Modal>
  );
};
