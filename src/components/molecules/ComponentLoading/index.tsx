import React from 'react';
import Loading from 'components/atoms/loading';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Props = {
  loading: boolean;
  children: React.ReactNode;
};

function ComponetLoading({ loading, children }: Props): JSX.Element {
  return (
    <>
      {loading && <Loading />}
      <div hidden={loading}>{children}</div>
    </>
  );
}

export default ComponetLoading;
