import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AddCircle from '@material-ui/icons/AddCircle';

const ChannelListAddItem = ({ setOpenDialog, setDialogData }) => {
  const handleClick = () => {
    setDialogData({ channelId: '', initialText: '', action: 'create' });
    setOpenDialog(true);
  };

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <AddCircle />
        </ListItemIcon>
        <ListItemText primary="Add a channel" />
      </ListItem>
    </List>
  );
};

export default ChannelListAddItem;
