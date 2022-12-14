import React from 'react';
import IconMenu from 'components/atoms/icomMenu';
import { Button } from '@mui/material';

export default function MenuButton({ ...props }): JSX.Element {
  return (
    <Button {...props}>
      <IconMenu />
    </Button>
  );
}
