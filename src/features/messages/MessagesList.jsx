import React from 'react';

import gon from 'gon';

import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { selectAllMessages } from './messagesSlice';

const useStyles = makeStyles(() => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  chatWindow: {
    width: '70%',
    height: '400px',
  },
}));

const MessagesList = () => {
  const classes = useStyles();
  const messages = useSelector(selectAllMessages);
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
