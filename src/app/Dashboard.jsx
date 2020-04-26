/* eslint arrow-parens: ["error", "as-needed"] */
import React from 'react';
// import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// import Chip from '@material-ui/core/Chip';
// import TextField from '@material-ui/core/TextField';

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

  // const currentChannelId = useSelector(state => state.channels.currentChannelId);
  // MessageInput();

  return (
    <div>
      <Paper className={classes.root} elevation={3}>
        {/* <Typography align="center" variant="h6" component="h6">
          Chat app
        </Typography>
        <Typography align="center" variant="h6" component="h6">
          {`Current channel: ${currentChannelId}`}
        </Typography> */}
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <ChannelsList />
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className={classes.chatWindow}>
            {/* {[
              { id: 123, from: 'user1', msg: 'hello' },
              { id: 124, from: 'user2', msg: 'hello' },
              { id: 125, from: 'user3', msg: 'hello' },
              { id: 126, from: 'user4', msg: 'hello' },
              { id: 127, from: 'user5', msg: 'hello' },
              { id: 128, from: 'user6', msg: 'hello' },
              // { id: 129, from: 'user7', msg: 'hello' },
            ].map(({ id, from, msg }) => (
              <div className={classes.flex} key={id}>
                <Chip
                  size="medium"
                  variant="outlined"
                  label={from}
                  className={classes.chip}
                />
                <Typography variant="subtitle2">{msg}</Typography>
              </div>
            ))} */}
            <MessagesList />
            {/* <MessageInput /> */}
          </div>
        </div>
        <MessageInput />
        {/* <div>
          <TextField label="Text message" fullWidth />
        </div> */}
      </Paper>
    </div>
  );
};

export default Dashboard;
