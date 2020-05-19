import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import * as yup from 'yup';
import routes from '../routes';
import { selectors } from '../slices';
import Ctx from '../Ctx';

const MessageInput = () => {
  const currentChannelId = useSelector(selectors.getCurrentChannelId);
  const { name } = useContext(Ctx);
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
            <Form onSubmit={handleSubmit}>
              <FormControl
                autoFocus
                name="text"
                label="Text message"
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default MessageInput;
