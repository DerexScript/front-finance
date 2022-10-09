import React from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from 'material-ui-confirm';

function App(): JSX.Element {
  return (
    <>
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
        <Routes />
      </ConfirmProvider>
    </>
  );
}

export default App;
