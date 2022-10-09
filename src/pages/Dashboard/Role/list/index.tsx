import React from 'react';
import RolesTemplate from 'components/templates/Roles';
import CustomMenu from 'components/menu';
// import { useFetch } from 'services/hooks/useAxios';

const Roles = (): JSX.Element => {
  return (
    <>
      <CustomMenu />
      <RolesTemplate />
    </>
  );
};

export default Roles;
