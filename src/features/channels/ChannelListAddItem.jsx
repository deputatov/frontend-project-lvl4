import React, { useState } from 'react';
import ChannelDialogAddItem from './ChannelDialogAddItem';

const ChannelListAddItem = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setOpenDialog(true)}
      >
        + Add a channel
      </button>
      <ChannelDialogAddItem open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
};

export default ChannelListAddItem;
