import React, { useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Loading = ({ state }: { state: boolean }): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  useEffect((): void => setOpen(state), [state]);
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default Loading;
