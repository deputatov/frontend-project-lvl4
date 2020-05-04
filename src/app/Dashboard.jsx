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
  topicsWindow: {
    width: '30%',
    height: '400px',
    overflow: 'auto',
  },
  chatWindow: {
    width: '70%',
    height: '400px',
    // padding: '20px',
    overflow: 'auto',
  },
  chatBox: {
    margin: '10px',
    width: '85%',
    // alignItems: 'center',
  },
  button: {
    width: '15%',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root} elevation={3}>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <ChannelsList />
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className={classes.chatWindow}>
            <MessagesList />
          </div>
        </div>
        <MessageInput />
      </Paper>
    </div>
  );
};

export default Dashboard;
