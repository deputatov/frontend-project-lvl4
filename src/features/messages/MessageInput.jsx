import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import routes from '../../routes';
import CTX from '../../ctx';

const MessageInput = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const { nickname } = useContext(CTX);

  const onSubmit = ({ text }, { resetForm, setSubmitting }) => {
    if (text) {
      setSubmitting(true);
      const data = { data: { attributes: { text, nickname } } };
      const url = routes.channelMessagesPath(currentChannelId);
      axios
        .post(url, data)
        .then(() => resetForm({ text: '' }))
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={onSubmit}>
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
                fullWidth
              />
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default MessageInput;
