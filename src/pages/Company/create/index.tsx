import React, { useState } from 'react';
import SiteMenu from 'components/siteMenu';
import { Box, Button, Grid, TextField } from '@mui/material';
import { ArrowBack, CloudUpload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAxios } from 'utils/useAxios';
import { Buffer } from 'buffer';

const companyCreate = (): JSX.Element => {
  const [companyName, setCompanyName] = useState<string>('');
  const [companyDescription, setCompanyDescription] = useState<string>('');
  const [showImage, setShowImage] = useState<string>('none');
  const [companyFile, setCompanyFile] = useState<FileList>({} as FileList);
  const [imgSrc, setImgSrc] = useState<string>('');
  const navigate = useNavigate();

  function showImageBase64(files: FileList | null): void {
    setCompanyFile(files as FileList);
    if (files) {
      const fileRef = files[0] || '';
      const fileType: string = fileRef.type || '';
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: ProgressEvent<FileReader>): void => {
        const resultBase64 = Buffer.from(ev.target?.result as WithImplicitCoercion<string>, 'binary').toString(
          'base64',
        );
        setImgSrc(`data:${fileType};base64,${resultBase64}`);
      };
      setShowImage('');
    }
  }

  const handleProductRegister = async (): Promise<void> => {
    if (companyName.length && companyDescription.length && companyFile.length) {
      const formData = new FormData();
      formData.append('image', companyFile[0], companyFile[0].name);
      formData.append('name', companyName);
      formData.append('description', companyDescription);
      const { response } = await useAxios({
        url: 'company',
        method: 'POST',
        data: formData,
      });
      if (response) {
        toast.success('Empresa adicionada com sucesso!');
        setShowImage('none');
        navigate('/Company');
      }
    } else {
      toast.error('Você precisa preencher todos os campos do formulario');
    }
  };

  return (
    <>
      <SiteMenu />

      <Grid container direction='row' sx={{ width: '100%' }} marginTop={1}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            p: 1,
            m: 1,
            maxWidth: '100%',
            borderRadius: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            height: '100%',
            backgroundColor: 'rgb(24, 26, 27)',
          }}
        >
          <Grid container justifyContent={'center'} marginTop={2}>
            <Box sx={{ width: '90%', mt: 5 }} component='form' noValidate autoComplete='off'>
              <Button
                color='info'
                startIcon={<ArrowBack />}
                sx={{ mb: '10px' }}
                size='large'
                variant='outlined'
                onClick={(): void => {
                  navigate(-1);
                }}
              >
                Voltar
              </Button>

              <div>
                <TextField
                  label='Nome'
                  onChange={(evt): void => setCompanyName(evt.target.value)}
                  value={companyName}
                  size='small'
                  sx={{ marginTop: '10px', width: '100%' }}
                  required={true}
                />
                <TextField
                  label='Descrição'
                  onChange={(evt): void => setCompanyDescription(evt.target.value)}
                  value={companyDescription}
                  size='small'
                  sx={{ marginTop: '10px', width: '100%' }}
                  required={true}
                />
              </div>
              <div>
                <Button
                  startIcon={<CloudUpload />}
                  variant='outlined'
                  component='label'
                  sx={{ marginTop: '10px', width: '100%' }}
                >
                  Enviar Imagem
                  <input
                    type='file'
                    onChange={(evt): void => showImageBase64(evt.target.files as FileList)}
                    required={true}
                    hidden
                  />
                </Button>
              </div>
              <div>
                <Button onClick={handleProductRegister} variant='contained' sx={{ marginTop: '10px', width: '100%' }}>
                  Cadastrar
                </Button>
              </div>
            </Box>
            <Grid container justifyContent={'center'} marginTop={2}>
              <Box
                component='img'
                sx={{
                  width: 270,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  marginTop: '10px',
                  display: showImage,
                }}
                alt='imagem a enviar'
                src={imgSrc}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default companyCreate;
