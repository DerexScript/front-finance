import React, { useEffect, useState } from 'react';
import CustomMenu from 'components/dashMenu';
import {
  TableBody,
  TableHead,
  Paper,
  Table,
  TableRow,
  TableContainer,
  Grid,
  Button,
  ButtonGroup,
  TableCell,
} from '@mui/material';
import { StyledTableCell, StyledTableRow } from './style';
import { ICompany } from './ICompany';
import { useAuth } from 'context/AuthProvider/useAuth';
import { myReq } from 'utils/myReq';
import { useNavigate } from 'react-router-dom';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';
import DialogMui from 'components/templates/DialogMUI';

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

  return (
    <>
      <CustomMenu />

      <Grid justifyContent='center' marginTop={2} container>
        <Grid item xs={11}>
          <Button
            variant='text'
            onClick={(): void => navigate('/dashboard/Company/Create')}
            aria-label='text button group'
          >
            Adicionar nova empresa
          </Button>
        </Grid>
      </Grid>
      {rows.length > 0 && (
        <Grid justifyContent='center' marginTop={2} container spacing={2}>
          <Grid item xs={11}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size='small' aria-label='Lista de empresas'>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align='right'>Nome</TableCell>
                    <TableCell align='right'>Descrição</TableCell>
                    <TableCell align='right'>image</TableCell>
                    <TableCell align='right'>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' align='right'>
                        {row.id}
                      </TableCell>
                      <TableCell align='right'>{row.name}</TableCell>
                      <TableCell align='right'>{row.description}</TableCell>
                      <TableCell align='right'>{row.image_name}</TableCell>
                      <TableCell align='right'>
                        <ButtonGroup variant='outlined' aria-label='outlined button group'>
                          <Button
                            size='small'
                            variant='outlined'
                            onClick={(): void => {
                              navigate(`/dashboard/Company/Update/${row.id}`);
                            }}
                          >
                            Editar
                          </Button>
                          <DialogMui
                            title='Deseja Excluir?'
                            contentText={`Tem certeza que deseja excluir a empresa ${row.name}`}
                            setResultDialog={setResultDialog}
                            entityID={row.id}
                            option1='Cancelar'
                            option2='Excluir'
                          />
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default Companies;
