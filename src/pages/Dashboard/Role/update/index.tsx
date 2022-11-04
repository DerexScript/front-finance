import React, { FormEvent, useEffect, useState } from 'react';
import CustomMenu from 'components/dashMenu';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthProvider/useAuth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RoleUpdate = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const params = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  const { idRole } = params;

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    const { response, error } = await useAxios({
      method: 'put',
      url: `role/${idRole}`,
      data: {
        name: name,
        description: description,
        role: role,
      },
    });
    if (response) {
      toast.success('Role editada com sucesso');
    } else {
      if (error?.data == 'Unauthorized.' && error?.status == 401) {
        toast.error('Sessão do usuario expirada, faça login novamente!', {
          onClose: () => {
            auth.logout();
          },
        });
      }
    }
    navigate(-1);
  };

  useEffect(() => {
    (async (): Promise<void> => {
      const { response, error } = await useAxios({ url: `role/${idRole}` });
      if (response) {
        setName(response.data.name);
        setDescription(response.data.description);
        setRole(response.data.role);
      } else {
        if (error?.data == 'Unauthorized.' && error?.status == 401) {
          toast.error('Sessão do usuario expirada, faça login novamente!', {
            onClose: () => {
              auth.logout();
            },
          });
        }
        navigate(-1);
      }
    })();
  }, []);
  return (
    <>
      <CustomMenu />
      <Grid
        container
        justifyContent='center'
        sx={{
          '& .MuiTextField-root': { width: '100%' },
        }}
      >
        <Box component='form' sx={{ width: '60%', mt: 5 }} noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Button
            color='info'
            startIcon={<ArrowBackIcon />}
            sx={{ mb: '10px' }}
            size='large'
            variant='outlined'
            onClick={(): void => {
              navigate(-1);
            }}
          >
            Voltar
          </Button>
          <Grid item xs={12}>
            <Typography align='center' variant='h1' component='h2' sx={{ fontSize: '24px', mb: '1.5rem' }}>
              Adicionar Função
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: '5px' }}>
            <TextField
              style={{ width: '100%' }}
              value={name}
              id='outlined-basic'
              name='name'
              label='Nome'
              variant='outlined'
              onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => setName(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: '5px' }}>
            <TextField
              style={{ width: '100%' }}
              value={description}
              id='outlined-basic'
              name='description'
              label='Descrição'
              variant='outlined'
              onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => setDescription(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: '5px' }}>
            <TextField
              style={{ width: '100%' }}
              value={role}
              id='outlined-basic'
              name='role'
              label='Função'
              variant='outlined'
              onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => setRole(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: '5px' }}>
            <Button type='submit' sx={{ mt: '10px', width: '100%' }} size='large' variant='contained'>
              Editar
            </Button>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default RoleUpdate;
