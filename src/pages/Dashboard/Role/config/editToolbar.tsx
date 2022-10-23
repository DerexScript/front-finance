import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import React from 'react';
import IEditToolbar from './IEditToolbar';

function editToolbar({ ...props }: IEditToolbar): JSX.Element {
  const { setRows, setRowModesModel, setPage } = props.props;
  const handleClick = (): void => {
    const id = randomId();
    setRows(oldRows => [...oldRows, { id, name: '', description: '', role: '', isNew: true }]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
    console.log('asd');
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

export default editToolbar;
