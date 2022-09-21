import React, { useEffect, useState } from 'react';
import CustomMenu from 'components/Menu';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Api } from 'services/api';
import Loading from 'components/atoms/loading';
import { Button, Grid, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type TRole = {
  created_at: string;
  description: string;
  id: number;
  name: string;
  role: string;
  updated_at: string;
};

const Role = (): JSX.Element => {
  const [columns, setColumns] = useState<GridColDef[]>();
  const [rows, setRows] = useState<GridColDef[]>();
  const [role, setRole] = useState<TRole[]>();
  const navigate = useNavigate();

  useEffect((): void => {
    (async (): Promise<void> => {
      const response = await Api.get('role');
      setRole(response.data.data);
    })();
  }, []);

  const test = async (): Promise<void> => {
    /*
    const column = Object.keys(response.data.data[0]).map(col => {
      console.log(col);
      return { field: col, headerName: col[0].toUpperCase() + col.slice(1), width: col.length * 15 };
    });
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
        renderCell: (params: GridRenderCellParams): JSX.Element => {
          const handleClick = async (evt: React.MouseEvent<HTMLButtonElement>, action: string): Promise<void> => {
            evt.preventDefault();
            evt.stopPropagation();
            const { id } = params.row;
            if (action == 'edit') {
              navigate(`/dashboard/Role/Update/${id}`);
            }
            if (action == 'remove') {
              if (window.confirm('Você deseja realmente deletar?')) {
                // const removeResponse = await Api.delete(`role/${id}`);
                console.log(`role/${id}`);
              }
            }
          };
          return (
            <>
              <Button
                size='small'
                variant='contained'
                sx={{ mr: '5px' }}
                onClick={(evt): Promise<void> => handleClick(evt, 'edit')}
              >
                Editar
              </Button>
              <Button
                size='small'
                variant='outlined'
                onClick={(evt): Promise<void> => handleClick(evt, 'remove')}
                color='error'
              >
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
      }) => {
        return {
          id: row.id,
          name: row.name,
          description: row.description,
          role: row.role,
          created_at: row.created_at,
          updated_at: row.updated_at,
        };
      },
    );
    setColumns(column);
    setRows(rows1);
    */
  };

  return (
    <>
      <CustomMenu />
      <Stack direction='row' spacing={2} sx={{ mt: '10px', display: 'flex', justifyContent: 'flex-end', mr: '5px' }}>
        <Button
          color='success'
          variant='contained'
          endIcon={<Add />}
          onClick={(): void => navigate('/dashboard/Role/Create')}
        >
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
