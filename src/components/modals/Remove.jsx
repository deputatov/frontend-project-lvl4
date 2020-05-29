import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { asyncActions } from '../../slices/index.js';

export default ({ modalInfo: { channel }, hideModal }) => {
  const dispatch = useDispatch();

  const initialValues = { id: channel.id, name: channel.name };

  const onSubmit = async (values, actions) => {
    const { removeChannel } = asyncActions;
    const resultAction = await dispatch(removeChannel({ id: values.id }));
    if (removeChannel.fulfilled.match(resultAction)) {
      actions.setSubmitting(false);
      hideModal();
      return;
    }
    const { message } = resultAction.error;
    actions.setErrors({ message });
  };

  const f = useFormik({ initialValues, onSubmit, onReset: hideModal });

  return (
    <Modal show onHide={hideModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={f.handleSubmit} onReset={f.handleReset}>
        <Modal.Body>
          <Form.Label>{f.values.name}</Form.Label>
          <Form.Control.Feedback type="invalid" className="d-block">
            {f.errors.message}
            &nbsp;
          </Form.Control.Feedback>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" disabled={f.isSubmitting}>Remove</Button>
          <Button variant="secondary" type="reset" disabled={f.isSubmitting}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
