import { FC, useState } from 'react';
import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export const WalletModal: FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    // <Backdrop
    //   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //   open={open}
    //   onClick={handleClose}
    // >
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You Need to connect a wallet to use this app
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Connect
        </Button>
      </DialogActions>
    </Dialog>
    // </Backdrop>
  );
};
