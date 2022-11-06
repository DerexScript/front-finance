import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';

type TDialog = {
  title: string;
  contentText: string;
  buttonValue?: string;
  setResultDialog: React.Dispatch<React.SetStateAction<number>>;
  entityID: number;
  option1: string;
  option2: string;
  iconStart: React.ReactNode;
  variant: 'text' | 'outlined' | 'contained' | undefined;
};

const DialogMui = ({ ...props }: TDialog): JSX.Element => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <Button
        startIcon={props.iconStart}
        size='small'
        variant={props.variant}
        color='error'
        onClick={(): void => {
          setOpenDialog(true);
        }}
      >
        {props.buttonValue}
      </Button>
      <Dialog
        open={openDialog}
        onClose={(): void => {
          setOpenDialog(false);
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{props.contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(): void => {
              setOpenDialog(false);
            }}
          >
            {props.option1}
          </Button>
          <Button
            autoFocus
            onClick={(): void => {
              props.setResultDialog(props.entityID);
              setOpenDialog(false);
            }}
          >
            {props.option2}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogMui;
