import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridEventListener,
  GridRowModel,
  GridRowModesModel,
  GridRowParams,
  GridValidRowModel,
  MuiEvent,
} from '@mui/x-data-grid';

import { Grid, Stack } from '@mui/material';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthProvider/useAuth';
import EditToolbar from '../../organisms/EditToolbar';
import roleCollumns from 'pages/Dashboard/Role/config/roleCollumns';

const Role = (): JSX.Element => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [rows, setRows] = useState<readonly GridValidRowModel[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(999);
  const [tableLoad, setTableLoad] = useState<boolean>(true);
  const auth = useAuth();
  const [statusButtons, setStatusButtons] = useState<boolean>(true);
  const collumns = roleCollumns({ rowModesModel, setRowModesModel, rows, setRows, statusButtons, setStatusButtons });

  useEffect(() => {
    (async (): Promise<void> => {
      const { response, error, axiosLoading } = await useAxios({ url: `role` });
      if (response) {
        setRows(response.data);
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
          toast.error('Erro ao obter Roles');
        }
      }
      setTableLoad(axiosLoading);
    })();
  }, []);

  const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>): void => {
    event.defaultMuiPrevented = true;
  };
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event): void => {
    event.defaultMuiPrevented = true;
  };

  const processRowUpdate = async (newRow: GridRowModel): Promise<GridRowModel> => {
    const updatedRow = { ...newRow, isNew: false };
    if (!newRow.isNew) {
      const { response, error } = await useAxios({ method: 'put', url: `role/${newRow.id}`, data: newRow });
      if (response) {
        setRows(rows?.map(row => (row.id === newRow.id ? updatedRow : row)));
      } else {
        if (error?.data == 'Unauthorized.' && error?.status == 401) {
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
        }
      }
    } else {
      const { response, error } = await useAxios({ method: 'post', url: `role`, data: newRow });
      if (response) {
        const formatedRow = { ...updatedRow, id: response.data.id };
        setRows(rows?.map(row => (row.id === newRow.id ? formatedRow : row)));
      } else {
        if (error?.data == 'Unauthorized.' && error?.status == 401) {
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
        }
        if (error?.status !== 201) {
          toast.error('Erro ao inserir nova role');
          setRows(rows?.filter(row => row.id !== newRow.id));
        }
      }
    }
    return updatedRow;
  };

  return (
    <Grid container sx={{ mt: '10px' }}>
      <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
        <div style={{ height: 400, width: '98%' }}>
          <DataGrid
            page={page}
            onPageChange={(newPage): void => setPage(newPage)}
            rows={rows}
            density='compact'
            columns={collumns}
            // pageSize={5}
            //rowsPerPageOptions={[5]}
            autoHeight
            pageSize={pageSize}
            onPageSizeChange={(newPageSize): void => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15]}
            pagination
            editMode='row'
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModel): void => setRowModesModel(newModel)}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            components={{
              NoRowsOverlay: () => (
                <Stack height='100%' alignItems='center' justifyContent='center'>
                  Não há registros
                </Stack>
              ),
              NoResultsOverlay: () => (
                <Stack height='100%' alignItems='center' justifyContent='center'>
                  Local filter returns no result
                </Stack>
              ),
              Toolbar: EditToolbar,
            }}
            componentsProps={{
              toolbar: { setRows, setRowModesModel, setPage },
            }}
            disableColumnSelector
            hideFooterSelectedRowCount
            loading={tableLoad}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Role;
