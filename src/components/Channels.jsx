import React from 'react';
import cn from 'classnames';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../slices';
import ChannelAddItem from './ChannelAddItem';
import ChannelRenameItem from './ChannelRenameItem';
import ChannelRemoveItem from './ChannelRemoveItem';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAllChannels);
  const currentChannelId = useSelector(selectors.getCurrentChannelId);

  const socket = io(process.env.PORT);
  socket.on('newChannel', (data) => dispatch(actions.createChannel(data)));
  socket.on('renameChannel', (data) => dispatch(actions.updateChannel(data)));
  socket.on('removeChannel', (data) => dispatch(actions.deleteChannel(data)));

  const handleListItemClick = (id) => () => {
    dispatch(actions.setCurrentChannelId({ id }));
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => (
          <li className="nav-item mb-1" key={id}>
            <button
              type="button"
              onClick={handleListItemClick(id)}
              className={cn({ [`nav-link btn btn-block ${id === currentChannelId ? 'active' : ''}`]: true })}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
      <div className="nav flex-column nav-pills nav-fill mt-2">
        <ChannelAddItem />
        <ChannelRenameItem />
        <ChannelRemoveItem />
      </div>
    </div>
  );
};

export default Channels;
