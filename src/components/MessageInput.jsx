import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { Formik, Form } from 'formik';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import * as yup from 'yup';
import routes from '../routes';
import selectors from '../selectors';
import Ctx from '../Ctx';

const MessageInput = () => {
  const currentChannelId = useSelector(selectors.getCurrentChannelId);
  const { name } = useContext(Ctx);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  const onSubmit = ({ text }, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    const data = { data: { attributes: { text, name } } };
    const url = routes.channelMessagesPath(currentChannelId);
    axios
      .post(url, data)
      .then(() => resetForm({ text: '' }))
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={onSubmit}
      validationSchema={yup.object({ text: yup.string().required() })}
    >
      {(props) => {
        const {
          values,
          handleBlur,
          handleSubmit,
          handleChange,
        } = props;
        return (
          <div className="mt-auto">
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    name="text"
                    type="text"
                    value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={inputRef}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    &nbsp;
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default MessageInput;
