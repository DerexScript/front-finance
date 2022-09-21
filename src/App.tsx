import React from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';

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
      <Routes />
    </>
  );
}

export default App;
