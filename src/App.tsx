import React from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from 'material-ui-confirm';
import { Box, createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App(): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        limit={4}
        pauseOnHover
      />
      <ConfirmProvider>
        <Box
          sx={{
            width: '100%',
            height: 'calc(100vh)',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <Routes />
        </Box>
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default App;
