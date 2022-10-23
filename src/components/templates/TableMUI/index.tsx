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
import IEditToolbar from 'pages/Dashboard/Role/config/IEditToolbar';
import IProcessRowUpdate from 'pages/Dashboard/Role/config/IProcessRowUpdate';
import { IContext } from 'context/AuthProvider/type';

const TableMUI = (props: {
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
  processRowUpdate: ({ ...props }: IProcessRowUpdate) => Promise<GridRowModel>;
  auth: IContext;
}): JSX.Element => {
  const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>): void => {
    event.defaultMuiPrevented = true;
  };
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event): void => {
    event.defaultMuiPrevented = true;
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
            onPageSizeChange={(newPageSize): void => {
              props.setPage(props.page - 1);
              props.setPageSize(newPageSize);
            }}
            rowsPerPageOptions={[5, 10, 15]}
            pagination
            editMode='row'
            rowModesModel={props.rowModesModel}
            onRowModesModelChange={(newModel): void => props.setRowModesModel(newModel)}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={(newRow: GridRowModel): Promise<GridRowModel> =>
              props.processRowUpdate({ newRow, props })
            }
            onProcessRowUpdateError={console.log}
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
