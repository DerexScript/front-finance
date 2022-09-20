import React from 'react';
import CustomMenu from 'components/Menu';
import { Box, Card } from '@mui/material';

const About = (): JSX.Element => {
  return (
    <>
      <CustomMenu />
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <h1>Olááá</h1>
      </Box>
    </>
  );
};

export default About;
