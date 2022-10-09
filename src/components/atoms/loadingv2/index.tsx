import React from 'react';
import Loading from '../loading';

const loadingv2 = ({ ...props }: { children: JSX.Element; loading: boolean }): JSX.Element => {
  return (
    <>
      {props.loading && <Loading />}
      <div hidden={props.loading}>{props.children}</div>
    </>
  );
};

export default loadingv2;
