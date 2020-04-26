import React from 'react';
import { useDispatch } from 'react-redux';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { deleteChannel } from './channelsSlice';

const ChannelListItem = ({ id, name, removable, setOpenDialog, setDialogData }) => {
  const dispatch = useDispatch();

  const handleEditChannel = () => {
    setDialogData({ id, initialText: name, action: 'rename' });
    setOpenDialog(true);
  };

  const handleDeleteChannel = () => {
    dispatch(deleteChannel({ params: { id } }));
  };

  return (
    <div>
      <ListItemText primary={name} />
      {removable && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={handleEditChannel}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={handleDeleteChannel}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </div>
  );
};

export default ChannelListItem;
