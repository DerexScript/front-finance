import React, { useEffect, useState } from 'react';
import CustomMenu from 'components/dashMenu';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useAxios } from 'utils/useAxios';
import Loading from 'components/atoms/loading';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthProvider/useAuth';
import { toast } from 'react-toastify';
import { IRole } from './IRole';

const Role = (): JSX.Element => {
  const [columns, setColumns] = useState<GridColDef[]>();
  const [rows, setRows] = useState<IRole[]>();
  const [role, setRole] = useState<IRole[]>();
  const [load, setLoad] = useState<boolean>(true);
  const [tableLoad, setTableLoad] = useState<boolean>(true);
  const [buttonState, setButtonState] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect((): void => {
    (async (): Promise<void> => {
      const { response, error } = await useAxios({ url: 'role' });
      if (response) {
        setRole(response.data);
        setLoad(false);
        setTableLoad(false);
      } else {
        if (error?.data == 'Unauthorized.' && error?.status == 401) {
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (role) {
      const column = [
        {
          field: 'id',
          headerName: 'Id',
          width: 15,
        },
        {
          field: 'name',
          headerName: 'Nome',
          minWidth: 110,
          flex: 1,
          editable: false,
        },
        {
          field: 'description',
          headerName: 'Descrição',
          minWidth: 110,
          flex: 1,
        },
        {
          field: 'role',
          headerName: 'Função',
          minWidth: 110,
          flex: 1,
        },
        {
          field: 'created_at',
          headerName: 'Criado Em',
          minWidth: 105,
          flex: 1,
        },
        {
          field: 'updated_at',
          headerName: 'Atualizado Em',
          minWidth: 100,
          flex: 1,
        },
        {
          field: 'Actions',
          headerName: 'Ações',
          minWidth: 150,
          flex: 1,
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
                  setButtonState(true);
                  setTableLoad(true);
                  const { response } = await useAxios({ method: 'delete', url: `role/${id}` });
                  if (response) {
                    setTableLoad(false);
                    setRole(role.filter(r => r.id !== id));
                    setButtonState(false);
                  } else {
                    toast.error('Erro ao deletar recurso');
                  }
                }
              }
            };
            return (
              <>
                <Button
                  disabled={buttonState}
                  size='small'
                  variant='contained'
                  sx={{ mr: '5px' }}
                  onClick={(evt): Promise<void> => handleClick(evt, 'edit')}
                >
                  Editar
                </Button>
                <Button
                  disabled={buttonState}
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
      const rows1 = role.map((row: IRole) => {
        return {
          id: row.id,
          name: row.name,
          description: row.description,
          role: row.role,
          created_at: row.created_at,
          updated_at: row.updated_at,
        };
      });
      setColumns(column);
      setRows(rows1);
    }
  }, [buttonState, role]);

  return (
    <>
      <CustomMenu />
      <Stack direction='row' spacing={2} sx={{ mt: '10px', display: 'flex', justifyContent: 'flex-end', mr: '1%' }}>
        <Button
          color='success'
          variant='contained'
          endIcon={<Add />}
          onClick={(): void => navigate('/dashboard/Role/Create')}
        >
          Adicionar
        </Button>
      </Stack>
      <Typography align='center' variant='h1' component='h2' sx={{ fontSize: '24px', mb: '1.5rem' }}>
        Funções Cadastradas
      </Typography>
      <Grid container sx={{ mt: '10px' }}>
        <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
          <div style={{ height: 400, width: '98%' }}>
            {columns?.length && rows?.length ? (
              <DataGrid
                hideFooterSelectedRowCount
                disableColumnSelector
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                loading={tableLoad}
              />
            ) : !load && rows?.length === 0 ? (
              <>Não há funções cadastradas no momento, adicione uma nova.</>
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
