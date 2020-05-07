import React, { useState } from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import ChannelDialogRenameItem from './ChannelDialogRenameItem';
import ChannelDialogDeleteItem from './ChannelDialogDeleteItem';

const ChannelListItem = ({ id, name, removable }) => {
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <div>
      <ListItemText primary={name} />
      {removable && (
        <>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => setOpenRenameDialog(true)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => setOpenDeleteDialog(true)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
          <ChannelDialogRenameItem
            id={id}
            name={name}
            open={openRenameDialog}
            onClose={() => setOpenRenameDialog(false)}
          />
          <ChannelDialogDeleteItem
            id={id}
            name={name}
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          />
        </>
      )}
    </div>
  );
};

export default ChannelListItem;
