import React from 'react';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import faker from 'faker';
import Cookies from 'js-cookie';
import { createMessage } from './messagesSlice';

const getName = () => {
  const username = Cookies.get('name');
  if (!username) {
    const newName = faker.fake('{{name.firstName}}.{{name.lastName}}');
    Cookies.set('name', newName);
    return newName;
  }
  return username;
};

const MessageInput = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.channels.currentChannelId);
  const nickname = getName();

  const onSubmit = ({ text }, { resetForm }) => {
    const data = {
      params: {
        channelId: id,
      },
      data: {
        attributes: {
          text,
          nickname,
        },
      },
    };
    dispatch(createMessage(data));
    resetForm({ text: '' });
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

// {() => (
//   <Form>
//     <TextField label="Text message" id="text" name="text" type="text" fullWidth />
//     {/* <Field name="text" type="text" />
//     <button type="submit" disabled={isSubmitting}>Submit</button> */}
//   </Form>
// )}
