import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slices/index.js';
import selectors from '../selectors/index.js';

const renderChannel = ({ channel, currentChannelId, setCurrentChannel }) => {
  const btnClass = cn('nav-link btn btn-block', { active: channel.id === currentChannelId });
  return (
    <li className="nav-item mb-1" key={channel.id}>
      <button type="button" className={btnClass} onClick={setCurrentChannel(channel.id)}>{channel.name}</button>
      <button type="button" className="border-0 btn-link mr-3 p-0">rename</button>
      <button type="button" className="border-0 btn-link p-0">remove</button>
    </li>
  );
};

export default ({ showModal }) => {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAllChannels);
  const currentChannelId = useSelector(selectors.getCurrentChannelId);

  const setCurrentChannel = (id) => () => dispatch(actions.setCurrentChannelId({ id }));

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto" onClick={() => showModal('adding')}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((channel) => renderChannel({ channel, currentChannelId, setCurrentChannel }))}
      </ul>
    </div>
  );
};
