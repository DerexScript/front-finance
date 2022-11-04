import React, { ChangeEvent, useEffect, useState } from 'react';
import CustomMenu from 'components/dashMenu';
import { Box, Grid, Button, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthProvider/useAuth';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';

const updateCompany = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const auth = useAuth();
  const { idCompany } = params;
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [user_id, setUserID] = useState<string>('');

  useEffect(() => {
    setUserID(user_id);
    (async (): Promise<void> => {
      const { response, error } = await useAxios({ url: `company/${idCompany}` });
      if (response) {
        setName(response.data.name);
        setDescription(response.data.description);
        setImageSrc(response.data.image_name);
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

  const handleUpdateImage = async (files: FileList): Promise<void> => {
    setImage(files[0] as File);
    if (files) {
      const fileRef = files[0] || '';
      const fileType: string = fileRef.type || '';
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: ProgressEvent<FileReader>): void => {
        const resultBase64 = Buffer.from(ev.target?.result as WithImplicitCoercion<string>, 'binary').toString(
          'base64',
        );
        setImageSrc(`data:${fileType};base64,${resultBase64}`);
      };
    }
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('_method', 'PUT');
    if (image !== null) {
      console.log(image);
      formData.append('image', image as File, image?.name as string);
    }
    const { response } = await useAxios({
      method: 'POST',
      url: `company/${idCompany}`,
      data: formData,
      headers: { 'Content-Type': 'application/json' },
    });
    if (response) {
      toast.success('Empresa editada com sucesso');
      navigate('/dashboard/Company');
    }
  };

  return (
    <>
      <CustomMenu />
      <Grid
        display='flex'
        justifyContent='center'
        marginTop={2}
        container
        sx={{ '& .MuiTextField-root': { width: '100%' } }}
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
              Editar informações da empresa
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
              onChange={(evt: ChangeEvent<HTMLInputElement>): void => setName(evt.target.value)}
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
              onChange={(evt: ChangeEvent<HTMLInputElement>): void => setDescription(evt.target.value)}
            />
          </Grid>
          <label htmlFor='inputImage' style={{ alignContent: 'center' }}>
            <Typography variant='h1' component='h2' sx={{ fontSize: '24px', mb: '1.5rem' }}>
              Click na imagem para editar
            </Typography>
            <Box
              component='img'
              sx={{
                height: 190,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                marginTop: '10px',
              }}
              alt='imagem a enviar'
              src={imageSrc}
            />
          </label>
          <input
            id='inputImage'
            type='file'
            onChange={(evt): void => {
              handleUpdateImage(evt.target.files as FileList);
            }}
            hidden
          />
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

export default updateCompany;
