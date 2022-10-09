import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsCellItemProps,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  GridToolbarContainer,
  GridValidRowModel,
  MuiEvent,
} from '@mui/x-data-grid';
import { DeleteOutlined, Edit, Save, Close, Add } from '@mui/icons-material';
import { Button, Grid, Stack } from '@mui/material';
import { randomId } from '@mui/x-data-grid-generator';
import { Api } from 'services/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthProvider/useAuth';
import { useConfirm } from 'material-ui-confirm';
// import Loading from 'components/atoms/loadingv2';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function EditToolbar(props: EditToolbarProps): JSX.Element {
  const { setRows, setRowModesModel, setPage } = props;
  const handleClick = (): void => {
    setPage(999);
    const id = randomId();
    setRows(oldRows => [...oldRows, { id, name: '', description: '', role: '', isNew: true }]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };
  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<Add />} onClick={handleClick}>
        Adicionar Role
      </Button>
    </GridToolbarContainer>
  );
}

const Role = (): JSX.Element => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [rows, setRows] = useState<readonly GridValidRowModel[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = React.useState(999);
  const [tableLoad, setTableLoad] = useState<boolean>(true);
  const auth = useAuth();
  const confirm = useConfirm();

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleEditClick = (id: GridRowId) => () => {
    const newRow = { ...rowModesModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' } };
    setRowModesModel(newRow);
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    confirm({ description: `Deseja apagar a role ${id}`, title: 'Aviso' })
      .then(async () => {
        const newRows = rows?.filter(row => row.id !== id);
        try {
          await Api.delete(`role/${id}`);
          setRows(newRows);
        } catch (error) {
          const err = error as AxiosError;
          if (err.response?.data == 'Unauthorized.' && err.response?.status == 401) {
            toast.error('Sessão do usuario expirada, faça login novamente!', {
              onClose: () => {
                auth.logout();
              },
            });
          }
        }
        setRows(newRows);
      })
      .catch(() => {
        console.log('Deletion cancelled.');
      });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows?.find(row => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows?.filter(row => row.id !== id));
    }
  };

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const response = await Api.get('role');
        setRows(response.data.data);
        setTableLoad(false);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data == 'Unauthorized.' && err.response?.status == 401) {
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
        }
      }
    })();
  }, []);

  const columns: GridColumns = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'description', headerName: 'Description', width: 150, editable: true },
    { field: 'role', headerName: 'Role', width: 150, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }): React.ReactElement<GridActionsCellItemProps, string>[] => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem key={1} icon={<Save />} label='Save' onClick={handleSaveClick(id)} />,
            <GridActionsCellItem
              key={2}
              icon={<Close />}
              label='Cancel'
              onClick={handleCancelClick(id)}
              className='textPrimary'
              color='inherit'
            />,
          ];
        }
        return [
          <GridActionsCellItem
            key={1}
            icon={<Edit />}
            label='Edit'
            onClick={handleEditClick(id)}
            className='textPrimary'
            color='inherit'
          />,
          <GridActionsCellItem
            key={2}
            icon={<DeleteOutlined />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>): void => {
    event.defaultMuiPrevented = true;
  };
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event): void => {
    event.defaultMuiPrevented = true;
  };

  const processRowUpdate = async (newRow: GridRowModel): Promise<GridRowModel> => {
    const updatedRow = { ...newRow, isNew: false };
    if (!newRow.isNew) {
      try {
        await Api.put(`role/${newRow.id}`, newRow);
        setRows(rows?.map(row => (row.id === newRow.id ? updatedRow : row)));
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data == 'Unauthorized.' && err.response?.status == 401) {
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
        }
      }
    } else {
      try {
        const response = await Api.post(`role`, newRow);
        const formatedRow = { ...updatedRow, id: response.data.response.data.id };
        setRows(rows?.map(row => (row.id === newRow.id ? formatedRow : row)));
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data == 'Unauthorized.' && err.response?.status == 401) {
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
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
            columns={columns}
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
