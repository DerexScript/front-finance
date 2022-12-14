import React, { useEffect, useState } from 'react';
import CustomMenu from 'components/dashMenu';
import { Grid, Button } from '@mui/material';
import { ICompany } from './ICompany';
import { useAuth } from 'context/AuthProvider/useAuth';
import { myReq } from 'utils/myReq';
import { useNavigate } from 'react-router-dom';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DialogMui from 'components/templates/DialogMUI';
import { DeleteOutlined as DeleteIcon, Edit } from '@mui/icons-material';

const Companies = (): JSX.Element => {
  const [rows, setRows] = useState<readonly ICompany[]>([]);
  const auth = useAuth();
  const navigate = useNavigate();
  const [resultDialog, setResultDialog] = useState<number>(0);

  useEffect(() => {
    (async (): Promise<void> => {
      const { response } = await myReq({ url: `company` }, auth);
      if (response?.data.length) {
        setRows(response?.data);
      }
    })();
  }, []);

  useEffect(() => {
    const deleteCompany = async (): Promise<void> => {
      if (resultDialog !== 0) {
        const { response } = await useAxios({
          url: `company/${resultDialog}`,
          method: 'DELETE',
        });
        if (response) {
          setRows(rows.filter(row => row.id !== resultDialog));
          toast.success(`Empresa deletada com sucesso!`);
        }
      }
    };
    deleteCompany();
    setResultDialog(0);
  }, [resultDialog]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.4 },
    { field: 'name', headerName: 'Empresa', flex: 1 },
    { field: 'description', headerName: 'Descrição', flex: 1 },
    {
      field: 'image_name',
      headerName: 'url_imagem',
      type: 'number',
      flex: 1,
    },
    {
      field: 'private',
      headerName: 'privado',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
    },
    {
      field: 'edit',
      headerName: 'Editar',
      description: 'Edite',
      sortable: false,
      flex: 1,
      renderCell: (params): JSX.Element => (
        <>
          <Button
            startIcon={<Edit />}
            variant='text'
            size='small'
            onClick={(): void => {
              navigate(`/dashboard/Company/Update/${params.id}`);
            }}
          ></Button>
        </>
      ),
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      description: 'Excluir Empresa',
      sortable: false,
      flex: 1,
      renderCell: (params): JSX.Element => (
        <>
          <DialogMui
            iconStart={<DeleteIcon />}
            title='Deseja Excluir?'
            contentText={`Tem certeza que deseja excluir a empresa ${params.row.name}? `}
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
            onClick={(): void => navigate('/dashboard/Company/Create')}
            aria-label='text button group'
          >
            Adicionar nova empresa
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default Companies;
