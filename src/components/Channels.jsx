import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { actions } from '../slices/index.js';
import selectors from '../selectors/index.js';

export default ({ showModal, currentChannelId }) => {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAllChannels);

  const setCurrentChannel = (id) => () => dispatch(actions.setCurrentChannelId({ id }));

  const renderChannel = (channel) => {
    const btnClass = cn('nav-link btn btn-block', { active: channel.id === currentChannelId });
    return (
      <li className="nav-item mb-1" key={channel.id}>
        <button type="button" className={btnClass} onClick={setCurrentChannel(channel.id)}>{channel.name}</button>
      </li>
    );
  };

  const renderButtons = () => {
    const channel = channels.find(({ id }) => id === currentChannelId);
    return (
      <>
        <button type="button" className="btn btn-secondary mb-2" onClick={() => showModal('adding')}>+ Add a channel</button>
        <button type="button" className="btn btn-secondary mb-2" disabled={!channel.removable} onClick={() => showModal('renaming', channel)}>Rename channel</button>
        <button type="button" className="btn btn-secondary mb-2" disabled={!channel.removable} onClick={() => showModal('removing', channel)}>Remove channel</button>
      </>
    );
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto" onClick={() => showModal('adding')}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">{channels.map(renderChannel)}</ul>
      <div className="nav flex-column nav-pills nav-fill mt-2">{renderButtons()}</div>
    </div>
  );
};
