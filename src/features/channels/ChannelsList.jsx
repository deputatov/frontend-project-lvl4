import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllChannels, setCurrentChannelIdRemovable } from './channelsSlice';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectAllChannels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const handleListItemClick = (id, removable) => () => {
    dispatch(setCurrentChannelIdRemovable({ id, removable }));
  };
  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name, removable }) => (
        <li className="nav-item mb-1" key={id}>
          <button
            type="button"
            onClick={handleListItemClick(id, removable)}
            className={cn({ [`nav-link btn btn-block ${id === currentChannelId ? 'active' : ''}`]: true })}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
