import React, { useEffect, useState } from 'react';
import CustomMenu from 'components/dashMenu';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { CloudUpload, ArrowBack } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';
import { useAxios } from 'utils/useAxios';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';

type ICategory = {
  id: number;
  name: string;
  description: string;
};

type IReleaseGroup = {
  id: number;
  name: string;
  description: string;
};

const ReleaseCreate = (): JSX.Element => {
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showImage, setShowImage] = useState<string>('none');
  const [releaseFile, setReleaseFile] = useState<FileList>({} as FileList);
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [releaseGroups, setReleaseGroups] = useState<IReleaseGroup[]>([]);
  const [releaseGroup, setReleaseGroup] = useState<string>('');
  const [openReleasesGroups, setOpenReleaseGroups] = useState<boolean>(false);
  const loadingCategories = openCategories && categories.length === 0;
  const loadingReleasesGroups = openReleasesGroups && releaseGroups.length === 0;
  const [entryCheckBox, setEntryCheckBox] = useState<boolean>(true);
  const [exitCheckBox, setExitCheckBox] = useState<boolean>(false);

  useEffect(() => {
    (async (): Promise<void> => {
      const getCategory = useAxios({ url: 'category' });
      const getReleaseGroup = useAxios({ url: 'release-group' });
      const [{ response: categoryResponse }, { response: releaseGroupResponse }] = await Promise.all([
        getCategory,
        getReleaseGroup,
      ]);
      if (categoryResponse) {
        setCategories(categoryResponse.data);
      }
      if (releaseGroupResponse) {
        setReleaseGroups(releaseGroupResponse.data);
      }
    })();
  }, []);

  function showImageBase64(files: FileList | null): void {
    setReleaseFile(files as FileList);
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

  const handleReleaseRegister = async (): Promise<void> => {
    if (description.length && value.length && releaseFile.length && category.length && releaseGroup.length) {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('value', value);
      formData.append('voucher', releaseFile[0], releaseFile[0].name);
      formData.append('status', status.toString());
      formData.append('category_id', category);
      formData.append('release_group_id', releaseGroup);
      const { response } = await useAxios({
        url: 'release',
        method: 'POST',
        data: formData,
      });
      if (response) {
        toast.success('Entrada adicionada com sucesso!');
        setShowImage('none');
        navigate('/dashboard/Release');
      }
    } else {
      toast.error('Você precisa preencher todos os campos do formulario');
    }
  };

  const controlChecks = (name: string, state: boolean): void => {
    switch (name) {
      case 'entryCheckbox':
        if (state) {
          setStatus(true);
          setEntryCheckBox(true);
          setExitCheckBox(false);
        } else {
          if (exitCheckBox) {
            setStatus(false);
            setEntryCheckBox(false);
          }
        }
        break;
      case 'exitCheckBox':
        if (state) {
          setStatus(false);
          setExitCheckBox(true);
          setEntryCheckBox(false);
        } else {
          if (entryCheckBox) {
            setExitCheckBox(false);
          }
        }
        break;
    }
  };

  return (
    <>
      <CustomMenu />
      <Grid display='flex' justifyContent='center' container sx={{ '& .MuiTextField-root': { width: '100%' } }}>
        <Grid container justifyContent={'center'} marginTop={2}>
          <Typography variant='h3' component='h3'>
            Criar Lançamento
          </Typography>
        </Grid>
        <Grid container justifyContent={'center'} marginTop={2}>
          <Box sx={{ width: '60%', mt: 5 }} component='form' noValidate autoComplete='off'>
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
              <Autocomplete
                id='releaseGroups'
                size='small'
                sx={{ marginTop: '10px' }}
                open={openReleasesGroups}
                onOpen={(): void => {
                  setOpenReleaseGroups(true);
                }}
                onClose={(): void => {
                  setOpenReleaseGroups(false);
                }}
                onChange={(event, value): void => {
                  setReleaseGroup(value?.id.toString() as string);
                }}
                options={releaseGroups}
                isOptionEqualToValue={(option, value): boolean => option.id === value.id}
                getOptionLabel={(option): string => `${option.id} - ${option.name}`}
                loading={loadingReleasesGroups}
                renderInput={(params): React.ReactNode => (
                  <TextField
                    {...params}
                    label='Grupos De Entradas'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingReleasesGroups ? <CircularProgress color='inherit' size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <TextField
                label='Descrição'
                onChange={(evt): void => setDescription(evt.target.value)}
                value={description}
                size='small'
                sx={{ marginTop: '10px' }}
                required={true}
              />
              <TextField
                label='Valor'
                type={'number'}
                onChange={(evt): void => setValue(evt.target.value)}
                value={value}
                size='small'
                sx={{ marginTop: '10px' }}
                required={true}
              />
              <Autocomplete
                id='categories'
                size='small'
                sx={{ marginTop: '10px' }}
                open={openCategories}
                onOpen={(): void => {
                  setOpenCategories(true);
                }}
                onClose={(): void => {
                  setOpenCategories(false);
                }}
                onChange={(event, value): void => {
                  setCategory(value?.id.toString() as string);
                }}
                options={categories}
                isOptionEqualToValue={(option, value): boolean => option.id === value.id}
                getOptionLabel={(option): string => `${option.id} - ${option.name}`}
                loading={loadingCategories}
                renderInput={(params): React.ReactNode => (
                  <TextField
                    {...params}
                    label='Categorias'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingCategories ? <CircularProgress color='inherit' size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={entryCheckBox}
                    onChange={(): void => {
                      controlChecks('entryCheckbox', !entryCheckBox);
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label='Entrada'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={exitCheckBox}
                    onChange={(): void => {
                      controlChecks('exitCheckBox', !exitCheckBox);
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label='Saida'
              />
            </div>

            <div>
              <Button
                startIcon={<CloudUpload />}
                variant='outlined'
                component='label'
                sx={{ marginTop: '10px', width: '100%' }}
              >
                Enviar Comprovante
                <input
                  type='file'
                  onChange={(evt): void => showImageBase64(evt.target.files as FileList)}
                  required={true}
                  hidden
                />
              </Button>
            </div>
            <div>
              <Button onClick={handleReleaseRegister} variant='contained' sx={{ marginTop: '10px', width: '100%' }}>
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
      </Grid>
    </>
  );
};

export default ReleaseCreate;
