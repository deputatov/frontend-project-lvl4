/* eslint arrow-parens: ["error", "as-needed"] */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import MessagesList from '../features/messages/MessagesList';
import MessageInput from '../features/messages/MessageInput';
import ChannelsList from '../features/channels/ChannelsList';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '10px',
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  channelsWindow: {
    width: '30%',
    height: '400px',
    overflow: 'auto',
  },
  messagesWindow: {
    width: '70%',
    height: '400px',
    overflow: 'auto',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root} elevation={3}>
        <div className={classes.flex}>
          <div className={classes.channelsWindow}>
            <ChannelsList />
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className={classes.messagesWindow}>
            <MessagesList />
          </div>
        </div>
        <MessageInput />
      </Paper>
    </div>
  );
};

export default Dashboard;
