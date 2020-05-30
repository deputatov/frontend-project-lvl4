import React, { useContext, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import Ctx from '../Ctx.js';
import { asyncActions } from '../slices/index.js';

export default ({ id }) => {
  const dispatch = useDispatch();
  const { name } = useContext(Ctx);

  const initialValues = { text: '' };

  const validationSchema = yup.object({ text: yup.string().required() });

  const onSubmit = async (values, actions) => {
    const { addMessage } = asyncActions;
    const data = { data: { attributes: { text: values.text, name } } };
    const resultAction = await dispatch(addMessage({ id, data }));
    if (addMessage.fulfilled.match(resultAction)) {
      actions.resetForm();
      actions.setSubmitting(false);
      return;
    }
    const { message } = resultAction.error;
    actions.setErrors({ message });
  };

  const f = useFormik({ initialValues, validationSchema, onSubmit });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [id, f.values]);

  return (
    <div className="mt-auto">
      <Form noValidate onSubmit={f.handleSubmit}>
        <Form.Group>
          <Form.Control
            name="text"
            type="text"
            value={f.values.text}
            onChange={f.handleChange}
            isInvalid={!!f.errors.message}
            disabled={f.isSubmitting}
            onBlur={f.handleBlur}
            ref={inputRef}
          />
          <Form.Control.Feedback type="invalid" className="d-block">
            {f.errors.message}
            &nbsp;
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  );
};
