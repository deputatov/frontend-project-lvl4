import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import io from 'socket.io-client';
import { actions, selectors } from '../slices';
import routes from '../routes';
import CTX from '../ctx';

const socket = io(process.env.PORT);

const Messages = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(selectors.getCurrentChannelId);
  const messages = useSelector(selectors.selectMessagesByChannelId(currentChannelId));

  useEffect(() => {
    socket.on('newMessage', (data) => dispatch(actions.createMessage(data)));
  }, [dispatch]);

  const renderMessagesList = () => (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map(({ id, text, name }) => (
        <div key={id}>
          <b>{name}</b>
          {`: ${text}`}
        </div>
      ))}
    </div>
  );

  const renderMessagesInput = () => {
    const { name } = useContext(CTX);
    const onSubmit = ({ text }, { resetForm, setSubmitting }) => {
      if (text) {
        setSubmitting(true);
        const data = { data: { attributes: { text, name } } };
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
                />
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  };

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        {renderMessagesList()}
        {renderMessagesInput()}
      </div>
    </div>
  );
};

export default Messages;
