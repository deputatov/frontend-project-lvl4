import React from 'react';

import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { selectMessagesByChannelId } from './messagesSlice';

const useStyles = makeStyles(() => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const MessagesList = () => {
  const classes = useStyles();
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector(selectMessagesByChannelId(channelId));

  return (
    <div>
      {messages.map(({ id, text, nickname }) => (
        <div className={classes.flex} key={id}>
          <Chip
            size="medium"
            variant="outlined"
            label={nickname}
            className={classes.chip}
          />
          <Typography variant="subtitle2">{text}</Typography>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
