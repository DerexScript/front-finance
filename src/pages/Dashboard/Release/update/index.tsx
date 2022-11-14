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
import { ArrowBack } from '@mui/icons-material/';
import { useNavigate, useParams } from 'react-router-dom';
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
  status: boolean | number;
  expiration: string;
  company_id: number | null;
  created_at: string;
  updated_at: string;
};

const ReleaseUpdate = (): JSX.Element => {
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);

  const [imgSrc, setImgSrc] = useState<string>('');
  const [releaseFile, setReleaseFile] = useState<FileList>({} as FileList);

  //category states
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const loadingCategories = openCategories && categories.length === 0;

  //entryGroups states
  const [releaseGroups, setReleasesGroups] = useState<IReleaseGroup[]>([]);
  const [releaseGroup, setReleaseGroup] = useState<IReleaseGroup | null>(null);
  const [openReleasesGroups, setOpenReleasesGroups] = useState<boolean>(false);
  const loadingReleasesGroups = openReleasesGroups && releaseGroups.length === 0;

  //checkboxes
  const [entryCheckBox, setEntryCheckBox] = useState<boolean>(false);
  const [exitCheckBox, setExitCheckBox] = useState<boolean>(false);

  //get url params
  const params = useParams();
  const { idRelease } = params;

  useEffect(() => {
    (async (): Promise<void> => {
      const getRelease = useAxios({ url: `release/${idRelease}` });
      const getCategory = useAxios({ url: 'category' });
      const getReleaseGroup = useAxios({ url: 'release-group' });
      const [{ response: releaseResponse }, { response: categoryResponse }, { response: releaseGroupResponse }] =
        await Promise.all([getRelease, getCategory, getReleaseGroup]);

      if (releaseResponse) {
        setImgSrc(releaseResponse.data.voucher);
        setDescription(releaseResponse.data.description);
        setValue(releaseResponse.data.value);
        if (releaseResponse.data.status) {
          setEntryCheckBox(true);
          setExitCheckBox(false);
        } else {
          setStatus(false);
          setExitCheckBox(true);
          setEntryCheckBox(false);
        }
      }

      if (categoryResponse) {
        setCategories(categoryResponse.data);
        if (releaseResponse) {
          setCategory(
            categoryResponse.data.filter((category: ICategory) => category.id === releaseResponse.data.category_id)[0],
          );
        }
      }
      if (releaseGroupResponse) {
        setReleasesGroups(releaseGroupResponse.data);
        if (releaseResponse) {
          setReleaseGroup(
            releaseGroupResponse.data.filter(
              (entry: IReleaseGroup) => entry.id === releaseResponse.data.release_group_id,
            )[0],
          );
        }
      }
    })();
  }, []);

  function handleUpdateImage(files: FileList | null): void {
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
    }
  }

  const handleUpdate = async (): Promise<void> => {
    if (description.length && value.length && category && releaseGroup) {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('value', value);
      if (releaseFile.length) {
        formData.append('voucher', releaseFile[0], releaseFile[0].name);
      }
      formData.append('status', status.toString());
      formData.append('category_id', category.id.toString());
      formData.append('release_group_id', releaseGroup.id.toString());
      formData.append('_method', 'PUT');
      const { response } = await useAxios({
        url: `release/${idRelease}`,
        method: 'POST',
        data: formData,
      });

      if (response) {
        toast.success('Lançamento adicionado com sucesso!');
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
            Editar Lançamento
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
              {releaseGroups.length > 0 ? (
                <Autocomplete
                  id='releaseGroups'
                  size='small'
                  sx={{ marginTop: '10px' }}
                  value={releaseGroup}
                  onChange={(_, value): void => {
                    setReleaseGroup(value as IReleaseGroup);
                  }}
                  options={releaseGroups}
                  open={openReleasesGroups}
                  onOpen={(): void => {
                    setOpenReleasesGroups(true);
                  }}
                  onClose={(): void => {
                    setOpenReleasesGroups(false);
                  }}
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
              ) : (
                <>Loading...</>
              )}
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
                inputProps={{
                  step: '0.01',
                }}
                onChange={(evt): void => setValue(evt.target.value)}
                value={value}
                size='small'
                sx={{ marginTop: '10px' }}
                required={true}
              />
              {categories.length > 0 ? (
                <Autocomplete
                  id='categories'
                  size='small'
                  sx={{ marginTop: '10px' }}
                  value={category}
                  open={openCategories}
                  onOpen={(): void => {
                    setOpenCategories(true);
                  }}
                  onClose={(): void => {
                    setOpenCategories(false);
                  }}
                  onChange={(_, value): void => {
                    setCategory(value);
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
              ) : (
                <>Loading...</>
              )}
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
              <Button onClick={handleUpdate} variant='contained' sx={{ marginTop: '10px', width: '100%' }}>
                Editar
              </Button>
            </div>
          </Box>

          <Grid container justifyContent={'center'} marginTop={2}>
            <label htmlFor='inputImage' style={{ justifyContent: 'center', alignContent: 'center' }}>
              <Typography variant='h1' component='h2' sx={{ fontSize: '24px', mb: '1.5rem' }}>
                Click na imagem para editar
              </Typography>
              <Box
                component='img'
                sx={{
                  width: 270,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  marginTop: '10px',
                }}
                alt='imagem a enviar'
                src={imgSrc}
              />
            </label>
            <input
              id='inputImage'
              type='file'
              accept='.png,.jpg,.jpeg'
              onChange={(evt): void => {
                handleUpdateImage(evt.target.files as FileList);
              }}
              hidden
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReleaseUpdate;
