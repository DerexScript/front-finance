import React, { useEffect, useState } from 'react';
import CustomMenu from 'components/Menu';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Api } from 'services/api';
import Loading from 'components/atoms/loading';
import { Button, Grid, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Role = (): JSX.Element => {
  const [columns, setColumns] = useState<GridColDef[]>();
  const [rows, setRows] = useState<GridColDef[]>();
  const navigate = useNavigate();
  useEffect((): void => {
    (async (): Promise<void> => {
      const response = await Api.get('role');
      /*
      const column = Object.keys(response.data.data[0]).map(col => {
        console.log(col);
        return { field: col, headerName: col[0].toUpperCase() + col.slice(1), width: col.length * 15 };
      });
      */
      const column = [
        {
          field: 'id',
          headerName: 'Id',
          width: 15,
        },
        {
          field: 'description',
          headerName: 'Descrição',
          width: 150,
        },
        {
          field: 'role',
          headerName: 'Role',
          width: 150,
        },
        {
          field: 'created_at',
          headerName: 'Criado Em',
          width: 150,
        },
        {
          field: 'updated_at',
          headerName: 'Atualizado Em',
          width: 150,
        },
        {
          field: 'Actions',
          headerName: 'Ações',
          width: 150,
          renderCell: (): JSX.Element => {
            const handleClick = (evt: React.MouseEvent<HTMLButtonElement>): boolean => {
              evt.preventDefault();
              evt.stopPropagation();
              return false;
            };
            return (
              <>
                <Button variant='contained' sx={{ mr: '5px' }} onClick={handleClick}>
                  Editar
                </Button>
                <Button variant='contained' onClick={handleClick} color='error'>
                  Deletar
                </Button>
              </>
            );
          },
        },
      ];
      const rows1 = response.data.data.map(
        (row: {
          id: number;
          name: string;
          description: string;
          role: string;
          created_at: string;
          updated_at: string;
          actions: JSX.Element;
        }) => {
          return {
            id: row.id,
            name: row.name,
            description: row.description,
            role: row.role,
            created_at: row.created_at,
            updated_at: row.updated_at,
            actions: (
              <>
                <Button variant='contained'>Contained</Button>
              </>
            ),
          };
        },
      );
      setColumns(column);
      setRows(rows1);
    })();
  }, []);

  const addRole = (): void => {
    navigate('/dashboard/Role/Create');
  };

  return (
    <>
      <CustomMenu />
      <Stack direction='row' spacing={2} sx={{ mt: '10px', display: 'flex', justifyContent: 'flex-end', mr: '5px' }}>
        <Button color='success' variant='contained' endIcon={<Add />} onClick={addRole}>
          Adicionar
        </Button>
      </Stack>
      <Grid container sx={{ mt: '10px' }}>
        <Grid item xs={12}>
          <div style={{ height: 400, width: '100%' }}>
            {columns?.length && rows?.length ? (
              <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
            ) : (
              <Loading />
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Role;
