import React, { ChangeEvent, FormEvent, useState } from 'react';
import CustomMenu from 'components/menu';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button, Snackbar, IconButton, Grid } from '@mui/material';
import { useAxios } from 'services/hooks/useAxios';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RoleCreate = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    const { response } = await useAxios({
      method: 'post',
      url: 'role',
      data: {
        name: name,
        description: description,
        role: role,
      },
    });

    if (response) {
      setOpen(true);
      toast.success('Role adicionada com sucesso.', {
        onClose: () => {
          navigate(-1);
        },
      });
    } else {
      toast.error('Erro ao criar Role.');
    }
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color='secondary' size='small' onClick={handleClose}>
        Fechar
      </Button>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <CustomMenu />
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message='Role adicionada com sucesso'
        action={action}
      />
      <Grid display='flex' justifyContent='center' container sx={{ '& .MuiTextField-root': { width: '100%' } }}>
        <Box sx={{ width: '60%', mt: 5 }} component='form' noValidate autoComplete='off' onSubmit={handleSubmit}>
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
          <Typography align='center' variant='h1' component='h2' sx={{ fontSize: '24px', mb: '1.5rem' }}>
            Adicionar Função
          </Typography>
          <TextField
            sx={{ mt: '10px' }}
            label='Nome'
            type='text'
            name='name'
            autoComplete='nome'
            onChange={(evt: ChangeEvent<HTMLInputElement>): void => setName(evt.target.value)}
          />
          <TextField
            sx={{ mt: '10px' }}
            label='Descrição'
            type='text'
            name='description'
            autoComplete='nome'
            onChange={(evt: ChangeEvent<HTMLInputElement>): void => setDescription(evt.target.value)}
          />
          <TextField
            sx={{ mt: '10px' }}
            label='Papel'
            type='text'
            name='role'
            autoComplete='nome'
            onChange={(evt: ChangeEvent<HTMLInputElement>): void => setRole(evt.target.value)}
          />
          <Button type='submit' sx={{ mt: '10px', width: '100%' }} size='large' variant='contained'>
            Cadastrar
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default RoleCreate;
