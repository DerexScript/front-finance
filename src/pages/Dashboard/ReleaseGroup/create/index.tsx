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
  TextFieldProps,
  Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

type ICompany = {
  id: number;
  name: string;
  description: string;
  private: number;
};

const ReleaseGroupCreate = (): JSX.Element => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);
  const [company, setCompany] = useState<ICompany>({} as ICompany);

  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [openCompanies, setOpenCompanies] = useState<boolean>(false);
  const loadingCompanies = openCompanies && companies.length === 0;

  const [activeCheckBox, setActiveCheckBox] = useState<boolean>(true);
  const [inactiveCheckBox, setInactiveCheckBox] = useState<boolean>(false);

  const [expiration, setExpiration] = useState<Dayjs | null>(dayjs(new Date().toISOString().split('T')[0]));

  useEffect(() => {
    (async (): Promise<void> => {
      const { response: companiesResponse } = await useAxios({ url: `company` });

      if (companiesResponse) {
        const companieDefault = {
          id: 0,
          name: 'Escolha uma empresa',
          description: 'Escolha uma empresa',
          private: 0,
        };
        setCompanies([companieDefault, ...companiesResponse.data]);
        setCompany(companieDefault);
      }

      // if (releaseGroupResponse) {
      //   setName(releaseGroupResponse.data.name);
      //   setDescription(releaseGroupResponse.data.description);

      //   const companieDefault = {
      //     id: 0,
      //     name: 'Escolha uma empresa',
      //     description: 'Escolha uma empresa',
      //     private: 0,
      //   };
      //   setCompanies([companieDefault, ...companiesResponse.data]);
      //   if (releaseGroupResponse.data.company_id) {
      //     setCompany(
      //       companiesResponse.data.filter(
      //         (company: ICompany) => company.id === releaseGroupResponse.data.company_id,
      //       )[0],
      //     );
      //   } else {
      //     setCompany(companieDefault);
      //   }

      //   if (releaseGroupResponse.data.status) {
      //     setActiveCheckBox(true);
      //     setInactiveCheckBox(false);
      //   } else {
      //     setStatus(false);
      //     setInactiveCheckBox(true);
      //     setActiveCheckBox(false);
      //   }
      // }
    })();
  }, []);

  const handleRegister = async (): Promise<void> => {
    if (name.length && description.length && company && company.id !== 0 && expiration) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('status', status.toString());
      formData.append('expiration', expiration.toISOString().split('T')[0]);
      formData.append('company_id', company.id.toString());
      const { response } = await useAxios({ url: 'release-group', method: 'POST', data: formData });
      if (response) {
        toast.success('Grupo de lançamento registrado com sucesso');
        navigate('/dashboard/ReleaseGroup');
      }
    } else {
      toast.error('Você precisa preencher todos os campos do formulario');
    }
  };

  const controlChecks = (name: string, state: boolean): void => {
    switch (name) {
      case 'activeCheckBox':
        if (state) {
          setStatus(true);
          setActiveCheckBox(true);
          setInactiveCheckBox(false);
        } else {
          if (inactiveCheckBox) {
            setStatus(false);
            setActiveCheckBox(false);
          }
        }
        break;
      case 'inactiveCheckBox':
        if (state) {
          setStatus(false);
          setInactiveCheckBox(true);
          setActiveCheckBox(false);
        } else {
          if (activeCheckBox) {
            setInactiveCheckBox(false);
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
            Criar novo grupo de lançamentos
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
              <TextField
                label='Nome'
                onChange={(evt): void => setName(evt.target.value)}
                value={name}
                size='small'
                sx={{ marginTop: '10px' }}
                required={true}
              />
              <TextField
                label='Descrição'
                onChange={(evt): void => setDescription(evt.target.value)}
                value={description}
                size='small'
                sx={{ marginTop: '10px', marginBottom: '10px' }}
                required={true}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                <MobileDatePicker
                  label='Data de expiração'
                  inputFormat='DD/MM/YYYY'
                  value={expiration}
                  onChange={(expirationDate: Dayjs | null): void => setExpiration(expirationDate)}
                  renderInput={(params: TextFieldProps): JSX.Element => <TextField {...params} />}
                />
              </LocalizationProvider>

              {companies.length > 0 ? (
                <Autocomplete
                  id='companies'
                  size='small'
                  sx={{ marginTop: '10px' }}
                  value={company}
                  open={openCompanies}
                  onOpen={(): void => {
                    setOpenCompanies(true);
                  }}
                  onClose={(): void => {
                    setOpenCompanies(false);
                  }}
                  onChange={(_, value): void => {
                    setCompany(value as ICompany);
                  }}
                  options={companies}
                  isOptionEqualToValue={(option, value): boolean => option.id === value.id}
                  getOptionLabel={(option): string => `${option.id} - ${option.name}`}
                  loading={loadingCompanies}
                  renderInput={(params): React.ReactNode => (
                    <>
                      <TextField
                        {...params}
                        label='Empresas'
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loadingCompanies ? <CircularProgress color='inherit' size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    </>
                  )}
                />
              ) : (
                <>Loading...</>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={activeCheckBox}
                    onChange={(): void => {
                      controlChecks('activeCheckBox', !activeCheckBox);
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label='Ativo'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={inactiveCheckBox}
                    onChange={(): void => {
                      controlChecks('inactiveCheckBox', !inactiveCheckBox);
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label='Inativo'
              />
            </div>

            <div>
              <Button onClick={handleRegister} variant='contained' sx={{ marginTop: '10px', width: '100%' }}>
                Registrar
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ReleaseGroupCreate;
