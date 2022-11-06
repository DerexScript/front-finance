import React, { useEffect, useState } from 'react';
import CustomMenu from 'components/dashMenu';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DialogMui from 'components/templates/DialogMUI';
import { DeleteOutlined as DeleteIcon, Edit } from '@mui/icons-material';

type IReleaseGroup = {
  id: number;
  name: string;
  description: string;
  status: number;
  expiration: string;
  company_id: string;
};

const ReleaseGroupList = (): JSX.Element => {
  const [rows, setRows] = useState<readonly IReleaseGroup[]>([]);
  const navigate = useNavigate();
  const [resultDialog, setResultDialog] = useState<number>(0);

  useEffect(() => {
    (async (): Promise<void> => {
      const { response } = await useAxios({ url: `release-group` });
      if (response) {
        setRows(response?.data);
      }
    })();
  }, []);

  useEffect(() => {
    const deleteRelease = async (): Promise<void> => {
      if (resultDialog !== 0) {
        const { response } = await useAxios({
          url: `release-group/${resultDialog}`,
          method: 'DELETE',
        });
        if (response) {
          setRows(rows.filter(row => row.id !== resultDialog));
          toast.success(`Grupo de lançamento deletado com sucesso!`);
        }
      }
    };
    deleteRelease();
    setResultDialog(0);
  }, [resultDialog]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.4, description: 'id do lançamento' },
    { field: 'name', headerName: 'Nome', flex: 1, description: 'Nome do grupo de lançamento' },
    {
      field: 'description',
      headerName: 'Descrição',
      flex: 1,
      description: 'descrição do grupo de lançamento',
    },
    {
      field: 'status',
      headerName: 'Status',
      description: 'status do grupo de lançamento',
      flex: 1,
    },
    {
      field: 'company_id',
      headerName: 'Id da empresa',
      flex: 1.2,
    },
    {
      field: 'edit',
      headerName: 'Editar',
      description: 'botão para editar este comprovante',
      sortable: false,
      flex: 1,
      renderCell: (params): JSX.Element => (
        <>
          <Button
            startIcon={<Edit />}
            variant='text'
            size='small'
            onClick={(): void => {
              navigate(`/dashboard/ReleaseGroup/Update/${params.id}`);
            }}
          ></Button>
        </>
      ),
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      description: 'botão para excluir este comprovante',
      sortable: false,
      flex: 1,
      renderCell: (params): JSX.Element => (
        <>
          <DialogMui
            iconStart={<DeleteIcon />}
            title='Deseja Excluir?'
            contentText={`Tem certeza que deseja excluir esse grupo entrada ${params.row.name}?`}
            setResultDialog={setResultDialog}
            entityID={params.id as number}
            option1='Cancelar'
            option2='Excluir'
            variant='text'
          />
        </>
      ),
    },
  ];

  return (
    <>
      <CustomMenu />
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgb(24, 26, 27)',
          marginTop: '120px',
        }}
        container
      >
        {rows.length > 0 && (
          <Grid item xs={11} style={{ display: 'flex', alignItems: 'center', height: 300, width: '100%' }}>
            <DataGrid
              hideFooterSelectedRowCount
              disableColumnSelector
              density='compact'
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Grid>
        )}
        <Grid sx={{ marginTop: '25px' }}>
          <Button
            variant='text'
            onClick={(): void => navigate('/dashboard/ReleaseGroup/Create')}
            aria-label='text button group'
          >
            Adicionar novo grupo lançamento
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ReleaseGroupList;
