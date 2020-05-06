import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Formik, Form } from 'formik';

import { renameChannel } from './channelsSlice';

const ChannelDialogRenameItem = ({
  open,
  onClose,
  id,
  name,
}) => {
  const dispatch = useDispatch();
  const onSubmit = ({ text }, { setSubmitting }) => {
    setSubmitting(true);
    const data = { params: { id }, data: { attributes: { name: text } } };
    dispatch(renameChannel(data))
      .then(() => onClose());
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Rename channel</DialogTitle>
      <DialogContent>
        <DialogContentText>New channel name</DialogContentText>
        <Formik initialValues={{ text: name }} onSubmit={onSubmit}>
          {(props) => {
            const {
              dirty,
              errors,
              values,
              handleBlur,
              handleSubmit,
              handleChange,
              isSubmitting,
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <TextField
                  error={errors.text}
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
                    Rename
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

export default ChannelDialogRenameItem;
