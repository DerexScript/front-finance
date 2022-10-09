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
import { useAxios } from 'services/hooks/useAxios';
import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthProvider/useAuth';
import { useConfirm } from 'material-ui-confirm';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function EditToolbar(props: EditToolbarProps): JSX.Element {
  const { setRows, setRowModesModel, setPage } = props;
  const handleClick = (): void => {
    const id = randomId();
    setRows(oldRows => [...oldRows, { id, name: '', description: '', role: '', isNew: true }]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
    setTimeout(() => {
      setPage(999);
    }, 200);
  };
  return (
    <GridToolbarContainer>
      <Button variant='outlined' color='primary' startIcon={<Add />} onClick={handleClick}>
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
  const [statusButtons, setStatusButtons] = useState<boolean>(true);
  const auth = useAuth();
  const confirm = useConfirm();

  const handleSaveClick = (id: GridRowId) => () => {
    setStatusButtons(false);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleEditClick = (id: GridRowId) => () => {
    setStatusButtons(true);
    const newRow = { ...rowModesModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' } };
    setRowModesModel(newRow);
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    setStatusButtons(true);
    await confirm({ description: `Deseja apagar a role ${id}`, title: 'Aviso' })
      .then(async () => {
        const newRows = rows?.filter(row => row.id !== id);
        const { response, error } = await useAxios({ method: 'delete', url: `role/${id}` });
        if (response) {
          setRows(newRows);
        } else {
          if (error?.data == 'Unauthorized.' && error?.status == 401) {
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
    setStatusButtons(false);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setStatusButtons(false);
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

  const columns: GridColumns = [
    { field: 'name', headerName: 'Name', minWidth: 110, flex: 1, editable: true },
    { field: 'description', headerName: 'Description', minWidth: 110, flex: 1, editable: true },
    { field: 'role', headerName: 'Role', minWidth: 110, flex: 1, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      minWidth: 110,
      flex: 1,
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
            disabled={statusButtons}
            key={1}
            icon={<Edit />}
            label='Edit'
            onClick={handleEditClick(id)}
            className='textPrimary'
            color='inherit'
          />,
          <GridActionsCellItem
            disabled={statusButtons}
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
