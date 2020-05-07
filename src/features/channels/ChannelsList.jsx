import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import { selectAllChannels, setCurrentChannelId } from './channelsSlice';

import ChannelListItem from './ChannelListItem';
import ChannelListAddItem from './ChannelListAddItem';

const ChannelsList = () => {
  const dispatch = useDispatch();
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
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ChannelListAddItem />
    </>
  );
};

export default ChannelsList;
