import React, { useState } from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import ChannelDialogRenameItem from './ChannelDialogRenameItem';

const ChannelListItem = ({ id, name, removable }) => {
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <div>
      <ListItemText primary={name} />
      {removable && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={() => setOpenRenameDialog(true)}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <DeleteIcon />
          </IconButton>
          <ChannelDialogRenameItem
            open={openRenameDialog}
            onClose={() => setOpenRenameDialog(false)}
            id={id}
            name={name}
          />
        </ListItemSecondaryAction>
      )}
    </div>
  );
};

export default ChannelListItem;
