import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

import { Formik, Form } from 'formik';

import { createChannel, updateChannel } from '../features/channels/channelsSlice';

const DialogForm = ({ open, onClose, dialogData }) => {
  const dispatch = useDispatch();

  const { id, initialText, action } = dialogData;

  const actions = {
    create: (data) => createChannel(data),
    rename: (data) => updateChannel(data),
  };

  const onSubmit = ({ text }, { setSubmitting }) => {
    setSubmitting(true);

    const requestData = { params: { id }, data: { attributes: { name: text } } };

    dispatch(actions[action](requestData));
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      {/* <DialogTitle id="form-dialog-title">Add a channel</DialogTitle> */}
      <DialogContent>
        {/* <DialogContentText>Channel name</DialogContentText> */}
        <Formik initialValues={{ text: initialText }} onSubmit={onSubmit}>
          {(props) => {
            const {
              values,
              isSubmitting,
              handleSubmit,
              handleChange,
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <TextField
                  autoFocus
                  value={values.text}
                  onChange={handleChange}
                  margin="dense"
                  id="text"
                  name="text"
                  label="New channel name"
                  type="text"
                  fullWidth
                />
                <DialogActions>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button
                    type="submit"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    {action}
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
