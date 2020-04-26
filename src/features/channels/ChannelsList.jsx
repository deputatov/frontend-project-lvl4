import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import { selectAllChannels } from './channelsSlice';
import ChannelListItem from './ChannelListItem';
import ChannelListAddItem from './ChannelListAddItem';
import DialogForm from '../../components/DialogForm';

const ChannelsList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({ id: '', initialText: '', action: '' });

  const channels = useSelector(selectAllChannels);
  const currentChannel = useSelector((state) => state.channels.currentChannelId);

  return (
    <>
      <List>
        {channels.map(({ id, name, removable }) => (
          <ListItem button key={id} selected={Number(currentChannel) === id}>
            <ChannelListItem
              id={id}
              name={name}
              removable={removable}
              setOpenDialog={setOpenDialog}
              setDialogData={setDialogData}
            />
          </ListItem>
        ))}
        <Divider />
        <ChannelListAddItem
          setOpenDialog={setOpenDialog}
          setDialogData={setDialogData}
        />
      </List>
      <DialogForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        dialogData={dialogData}
      />
    </>
  );
};

export default ChannelsList;
