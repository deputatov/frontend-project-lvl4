import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Formik } from 'formik';

import { removeChannel } from './channelsSlice';

const ChannelDialogDeleteItem = ({
  open,
  onClose,
  id,
  name,
}) => {
  const dispatch = useDispatch();
  const handleRemoveChannel = () => {
    dispatch(removeChannel(id)).then(() => onClose());
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Remove channel</DialogTitle>
      <DialogContent>
        <DialogContentText>{name}</DialogContentText>
        <Formik>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" onClick={handleRemoveChannel}>
              Remove
            </Button>
          </DialogActions>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelDialogDeleteItem;
