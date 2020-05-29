import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { actions } from '../slices/index.js';
import selectors from '../selectors/index.js';

export default ({ showModal }) => {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAllChannels);
  const currentChannelId = useSelector(selectors.getCurrentChannelId);

  const setCurrentChannel = (id) => () => dispatch(actions.setCurrentChannelId({ id }));

  const renderChannel = (channel) => {
    const btnClass = cn('nav-link btn btn-block', { active: channel.id === currentChannelId });
    return (
      <li className="nav-item mb-1" key={channel.id}>
        <button type="button" className={btnClass} onClick={setCurrentChannel(channel.id)}>{channel.name}</button>
        <button type="button" className="border-0 btn-link mr-3 p-0" onClick={() => showModal('renaming', channel)}>rename</button>
        <button type="button" className="border-0 btn-link p-0" onClick={() => showModal('removing', channel)}>remove</button>
      </li>
    );
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto" onClick={() => showModal('adding')}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">{channels.map(renderChannel)}</ul>
    </div>
  );
};
