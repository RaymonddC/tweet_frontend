import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #808080',
  boxShadow: 24,
  p: 1,
  color: 'white',
  borderRadius: '20px',
};

export default function KeepMountedModal(props) {
  const [open, setOpen] = useState(props.open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.setOpen(false);
  };

  useEffect(() => {
    setOpen(props.open);
    // props.setOpen(false);
  }, [props.open]);

  return (
    <div className="dark:bg-black text-white">
      {/* <Button onClick={handleOpen} className="flex gap-3 justify-center align-middle " sx={{ color: 'white' }}>
        {props.icon}
        {props.button}
      </Button> */}
      <Modal keepMounted open={open} onClose={handleClose} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
          <div className="absolute top-[1em] left-3" onClick={handleClose}>
            <CloseRoundedIcon fontSize="large" />
          </div>
          <p className="flex justify-center text-[25px] py-[1em] font-bold">{props.button}</p>
          {props.formBox}
        </Box>
      </Modal>
    </div>
  );
}
