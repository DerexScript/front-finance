import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import React from 'react';

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

export default EditToolbar;
