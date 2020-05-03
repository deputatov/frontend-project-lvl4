import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import { selectAllChannels, setCurrentChannelId } from './channelsSlice';

import ChannelListItem from './ChannelListItem';
import ChannelListAddItem from './ChannelListAddItem';
import DialogForm from '../../components/DialogForm';

const ChannelsList = () => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({ id: '', initialText: '', action: '' });

  const channels = useSelector(selectAllChannels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleListItemClick = (id) => () => dispatch(setCurrentChannelId({ id }));

  return (
    <>
      <List>
        {channels.map(({ id, name, removable }) => (
          <ListItem
            button
            key={id}
            selected={Number(currentChannelId) === id}
            onClick={handleListItemClick(id)}
          >
            <ChannelListItem
              id={id}
              name={name}
              removable={removable}
              setOpenDialog={setOpenDialog}
              setDialogData={setDialogData}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ChannelListAddItem />
      <DialogForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        dialogData={dialogData}
      />
    </>
  );
};

export default ChannelsList;
