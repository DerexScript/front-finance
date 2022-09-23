import React, { FormEvent, useEffect, useState } from 'react';
import CustomMenu from 'components/menu';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Api } from 'services/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthProvider/useAuth';

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
    try {
      await Api.put(`role/${idRole}`, {
        name: name,
        description: description,
        role: role,
      });
      toast.success('Role editada com sucesso', {
        onClose: () => {
          navigate(-1);
        },
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.data == 'Unauthorized.' && err.response?.status == 401) {
        toast.error('Sessão do usuario expirada, faça login novamente!', {
          onClose: () => {
            auth.logout();
          },
        });
      }
      navigate(-1);
    }
  };

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const role = await Api.get(`role/${idRole}`);
        setName(role.data.data.name);
        setDescription(role.data.data.description);
        setRole(role.data.data.role);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data == 'Unauthorized.' && err.response?.status == 401) {
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
        <Box component='form' sx={{ width: '60%' }} noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Grid item xs={12} sx={{ mt: 5 }}>
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
