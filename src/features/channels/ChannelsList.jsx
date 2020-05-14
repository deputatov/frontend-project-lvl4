import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllChannels, setCurrentChannelId } from '../../slices/channels';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectAllChannels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const handleListItemClick = (id) => () => {
    dispatch(setCurrentChannelId({ id }));
  };
  return (
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
  );
};

export default ChannelsList;
