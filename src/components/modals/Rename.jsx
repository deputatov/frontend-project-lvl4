import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { asyncActions } from '../../slices/index.js';

export default ({ modalInfo: { channel }, hideModal }) => {
  const dispatch = useDispatch();

  const initialValues = { name: channel.name };

  const onSubmit = async (values, actions) => {
    const { renameChannel } = asyncActions;
    const data = { data: { attributes: { name: values.name } } };
    const resultAction = await dispatch(renameChannel({ id: channel.id, data }));
    if (renameChannel.fulfilled.match(resultAction)) {
      actions.setSubmitting(false);
      hideModal();
      return;
    }
    const { message } = resultAction.error;
    actions.setErrors({ message });
  };

  const f = useFormik({ initialValues, onSubmit, onReset: hideModal });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, [null]);

  return (
    <Modal show onHide={hideModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={f.handleSubmit} onReset={f.handleReset}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              name="name"
              type="text"
              value={f.values.name}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              isInvalid={!!f.errors.message}
              disabled={f.isSubmitting}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {f.errors.message}
              &nbsp;
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" disabled={f.isSubmitting || !f.dirty}>Rename</Button>
          <Button variant="secondary" type="reset" disabled={f.isSubmitting}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
