import React from 'react';
import {
  DataGrid,
  GridColumns,
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
import IEditToolbar from 'pages/Dashboard/Role/config/IEditToolbar';

const TableMUI = (props: {
  children?: JSX.Element;
  rows: readonly GridValidRowModel[];
  setRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>;
  rowModesModel: GridRowModesModel;
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  tableLoad: boolean;
  setTableLoad: React.Dispatch<React.SetStateAction<boolean>>;
  statusButtons: boolean;
  setStatusButtons: React.Dispatch<React.SetStateAction<boolean>>;
  collumns: GridColumns;
  editToolbar({ ...props }: IEditToolbar): JSX.Element;
}): JSX.Element => {
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
        props.setRows(props.rows?.map(row => (row.id === newRow.id ? updatedRow : row)));
      } else {
        if (error?.data == 'Unauthorized.' && error?.status == 401) {
          console.log('sessão do usuario expirada, faça login novamente!');
          /*
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
          */
        }
      }
    } else {
      const { response, error } = await useAxios({ method: 'post', url: `role`, data: newRow });
      if (response) {
        const formatedRow = { ...updatedRow, id: response.data.id };
        props.setRows(props.rows?.map(row => (row.id === newRow.id ? formatedRow : row)));
      } else {
        if (error?.data == 'Unauthorized.' && error?.status == 401) {
          console.log('sessão do usuario expirada, faça login novamente!');
          /*
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
          */
        }
        if (error?.status !== 201) {
          toast.error('Erro ao inserir nova role');
          props.setRows(props.rows?.filter(row => row.id !== newRow.id));
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
            page={props.page}
            onPageChange={(newPage): void => props.setPage(newPage)}
            rows={props.rows}
            density='compact'
            columns={props.collumns}
            autoHeight
            pageSize={props.pageSize}
            onPageSizeChange={(newPageSize): void => props.setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15]}
            pagination
            editMode='row'
            rowModesModel={props.rowModesModel}
            onRowModesModelChange={(newModel): void => props.setRowModesModel(newModel)}
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
              Toolbar: props.editToolbar,
            }}
            componentsProps={{
              toolbar: { props },
            }}
            disableColumnSelector
            hideFooterSelectedRowCount
            loading={props.tableLoad}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default TableMUI;
