import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { Formik, Form } from 'formik';

import TextField from '@material-ui/core/TextField';

import axios from 'axios';

import routes from '../../routes';

import UsernameContext from '../../ctx';

const MessageInput = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const nickname = useContext(UsernameContext);

  const onSubmit = ({ text }, { resetForm }) => {
    const data = { data: { attributes: { text, nickname } } };
    const url = routes.channelMessagesPath(currentChannelId);
    return axios
      .post(url, data)
      .then(() => resetForm({ text: '' }))
      .catch((err) => { throw err; });
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={onSubmit}>
      {(props) => {
        const {
          values,
          handleSubmit,
          handleChange,
        } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              value={values.text}
              onChange={handleChange}
              id="text"
              name="text"
              label="Text message"
              type="text"
              fullWidth
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default MessageInput;
