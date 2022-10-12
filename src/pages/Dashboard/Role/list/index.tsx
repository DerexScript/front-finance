import React, { useEffect, useState } from 'react';
import RolesTemplate from 'components/templates/Roles';
import CustomMenu from 'components/menu';
// import { useAxios } from 'utils/useAxios';
import { GridValidRowModel } from '@mui/x-data-grid';
// import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthProvider/useAuth';

const Roles = (): JSX.Element => {
  // const [rows, setRows] = useState<readonly GridValidRowModel[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const auth = useAuth();

  /*
  useEffect(() => {
    (async (): Promise<void> => {
      const { response, error, axiosLoading } = await useAxios({ url: `role` });
      if (response) {
        setRows(response.data);
        setLoading(false);
      } else {
        if (error?.data == 'Unauthorized.' && error?.status == 401) {
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
        }
        if (error?.status == 0) {
          toast.error('Erro ao obter Roles');
        }
      }
      setLoading(axiosLoading);
    })();
  }, []);
  */

  return (
    <>
      <CustomMenu />
      <RolesTemplate />
    </>
  );
};

export default Roles;
