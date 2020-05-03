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
  const onSubmit = ({ text }, { setSubmitting }) => {
    setSubmitting(true);
    const data = { data: { attributes: { name: text } } };
    const url = routes.channelsPath();
    return axios
      .post(url, data)
      .then(() => onClose())
      .catch((err) => { throw err; });
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add a channel</DialogTitle>
      <DialogContent>
        <DialogContentText>New channel name</DialogContentText>
        <Formik initialValues={{ text: '' }} onSubmit={onSubmit}>
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
