import React, { useEffect, useState } from 'react';
import TableMUI from 'components/templates/TableMUI';
import CustomMenu from 'components/dashMenu';
import { GridRowModesModel, GridValidRowModel } from '@mui/x-data-grid';
import companyCollumns from 'pages/Dashboard/Companies/list/config/companyCollumns';
import editToolbar from 'pages/Dashboard/Companies/list/config/editToolbar';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthProvider/useAuth';
import processRowUpdate from 'pages/Dashboard/Companies/list/config/processRowUpdate';
import Loading from 'components/atoms/loading';
import { ICompany } from './ICompany';

const Companies = (): JSX.Element => {
  const [rows, setRows] = useState<readonly GridValidRowModel[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(999);
  const [tableLoad, setTableLoad] = useState<boolean>(true);
  const [statusButtons, setStatusButtons] = useState<boolean>(true);
  const collumns = companyCollumns({
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
      const { response, error } = await useAxios({ url: `company` });
      if (response) {
        const companies = response.data.map((company: ICompany) => {
          company.user_id = !company.user_id ? 0 : company.user_id;
          return company;
        });
        setRows(companies);
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
          toast.error('Erro ao obter empresas');
        }
      }
    })();
  }, []);

  return (
    <>
      <CustomMenu />
      {!tableLoad ? (
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
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Companies;
