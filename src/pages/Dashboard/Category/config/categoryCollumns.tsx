import React from 'react';
import { Close, DeleteOutlined, Save, Edit } from '@mui/icons-material';
import {
  GridActionsCellItem,
  GridActionsCellItemProps,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridValidRowModel,
} from '@mui/x-data-grid';
import TooltipCell from 'components/organisms/RenderCell/TooltipCell';
import { useConfirm } from 'material-ui-confirm';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthProvider/useAuth';

const categoryCollumns = ({
  ...props
}: {
  children?: JSX.Element;
  rowModesModel: GridRowModesModel;
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
  rows: readonly GridValidRowModel[];
  setRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>;
  statusButtons: boolean;
  setStatusButtons: React.Dispatch<React.SetStateAction<boolean>>;
}): GridColumns => {
  const confirm = useConfirm();
  const auth = useAuth();

  const handleSaveClick = (id: GridRowId) => () => {
    props.setStatusButtons(false);
    props.setRowModesModel({ ...props.rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleEditClick = (id: GridRowId) => () => {
    props.setStatusButtons(true);
    const newRow = { ...props.rowModesModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' } };
    props.setRowModesModel(newRow);
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    props.setStatusButtons(true);
    await confirm({ description: `Deseja apagar a categoria ${id}`, title: 'Aviso' })
      .then(async () => {
        const newRows = props.rows?.filter(row => row.id !== id);
        const { response, error } = await useAxios({ method: 'delete', url: `category/${id}` });
        if (response) {
          props.setRows(newRows);
        } else {
          if (error?.data == 'Unauthorized.' && error?.status == 401) {
            toast.error('Sessão do usuario expirada, faça login novamente!', {
              onClose: () => {
                auth.logout();
              },
            });
          }
        }
        props.setRows(newRows);
      })
      .catch(() => {
        console.log('Deletion cancelled.');
      });
    props.setStatusButtons(false);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    props.setStatusButtons(false);
    props.setRowModesModel({
      ...props.rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = props.rows?.find(row => row.id === id);
    if (editedRow?.isNew) {
      props.setRows(props.rows?.filter(row => row.id !== id));
    }
  };

  return [
    { field: 'id', headerName: 'ID', flex: 1, hide: true },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      editable: true,
      description: 'Nome visivel do seu papel',
      renderCell: (params: GridRenderCellParams): JSX.Element => {
        return <TooltipCell params={params} collumns='name' />;
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      editable: true,
      description: 'Uma descrição curta para seu papel',
      renderCell: (params: GridRenderCellParams): JSX.Element => {
        return <TooltipCell params={params} collumns='description' />;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 1,
      description: 'Edite e exclua categorias',
      getActions: ({ id }): React.ReactElement<GridActionsCellItemProps, string>[] => {
        const isInEditMode = props.rowModesModel[id]?.mode === GridRowModes.Edit;
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
            disabled={props.statusButtons}
            key={1}
            icon={<Edit />}
            label='Edit'
            onClick={handleEditClick(id)}
            className='textPrimary'
            color='inherit'
          />,
          <GridActionsCellItem
            disabled={props.statusButtons}
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
};

export default categoryCollumns;
