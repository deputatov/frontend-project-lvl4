import React, { useState } from 'react';

import ChannelDialogRenameItem from './ChannelDialogRenameItem';
import ChannelDialogDeleteItem from './ChannelDialogDeleteItem';

const ChannelListItem = ({ id, name, removable }) => {
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
    <li className="nav-item">
      <button type="button" className="nav-link btn btn-block active">
        {name}
      </button>
    </li>
  );
};

export default ChannelListItem;
