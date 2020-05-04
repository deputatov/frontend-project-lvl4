import React from 'react';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Formik, Form } from 'formik';

import routes from '../../routes';

const ChannelDialogAddItem = ({ open, onClose }) => {
  const onSubmit = ({ text }, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    const data = { data: { attributes: { name: text } } };
    const url = routes.channelsPath();
    axios
      .post(url, data)
      .then(() => {
        resetForm({ text: '' });
        onClose();
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add a channel</DialogTitle>
      <DialogContent>
        <DialogContentText>New channel name</DialogContentText>
        <Formik initialValues={{ text: '' }} onSubmit={onSubmit}>
          {(props) => {
            const {
              dirty,
              values,
              handleBlur,
              handleSubmit,
              handleChange,
              isSubmitting,
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <TextField
                  autoFocus
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="dense"
                  fullWidth
                />
                <DialogActions>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="submit" disabled={!dirty || isSubmitting}>
                    Add
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

export default ChannelDialogAddItem;
