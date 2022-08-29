import { Skeleton } from '@mui/material';
import React from 'react';

export default function Loading(): JSX.Element {
  return <Skeleton variant='rectangular' height='75vh' animation='wave' />;
}
