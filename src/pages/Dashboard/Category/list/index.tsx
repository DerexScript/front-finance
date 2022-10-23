import React, { useEffect, useState } from 'react';
import TableMUI from 'components/templates/TableMUI';
import CustomMenu from 'components/menu';
import { GridRowModesModel, GridValidRowModel } from '@mui/x-data-grid';
import categoryCollumns from 'pages/Dashboard/Category/config/categoryCollumns';
import editToolbar from 'pages/Dashboard/Category/config/editToolbar';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthProvider/useAuth';
import processRowUpdate from 'pages/Dashboard/Category/config/processRowUpdate';

const Category = (): JSX.Element => {
  const [rows, setRows] = useState<readonly GridValidRowModel[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(999);
  const [tableLoad, setTableLoad] = useState<boolean>(true);
  const [statusButtons, setStatusButtons] = useState<boolean>(true);

  const collumns = categoryCollumns({
    rowModesModel,
    setRowModesModel,
    rows,
    setRows,
    statusButtons,
    setStatusButtons,
  });
  const auth = useAuth();
  useEffect(() => {
    (async (): Promise<void> => {
      const { response, error } = await useAxios({ url: `category` });
      if (response) {
        setRows(response.data);
        setTableLoad(false);
        setStatusButtons(false);
      } else {
        if (error?.data == 'Unauthorized.' && error?.status == 401) {
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
        }
        if (error?.status == 0) {
          toast.error('Erro ao obter categoria');
        }
      }
    })();
  }, []);

  return (
    <>
      <CustomMenu />
      {!tableLoad && (
        <TableMUI
          rows={rows}
          setRows={setRows}
          rowModesModel={rowModesModel}
          setRowModesModel={setRowModesModel}
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          tableLoad={tableLoad}
          setTableLoad={setTableLoad}
          statusButtons={statusButtons}
          setStatusButtons={setStatusButtons}
          collumns={collumns}
          editToolbar={editToolbar}
          processRowUpdate={processRowUpdate}
          auth={auth}
        />
      )}
    </>
  );
};

export default Category;
