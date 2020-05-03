import React, { useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AddCircle from '@material-ui/icons/AddCircle';

import ChannelDialogAddItem from './ChannelDialogAddItem';

const ChannelListAddItem = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    setOpenDialog(true);
  };

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <AddCircle />
        </ListItemIcon>
        <ListItemText
          primary="Add a channel"
        />
      </ListItem>
      <ChannelDialogAddItem open={openDialog} onClose={() => setOpenDialog(false)} />
    </List>
  );
};

export default ChannelListAddItem;
