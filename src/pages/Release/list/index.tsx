import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Stack,
  Switch,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import SiteMenu from 'components/siteMenu';
import { Add as AddIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import { useAxios } from 'utils/useAxios';

type TCategory = {
  id: number;
  name: string;
  description: string;
};

const Releases = (): JSX.Element => {
  const [insertDate, setInsertDate] = useState<Dayjs | null>(dayjs(new Date().toISOString()));
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [category, setCategory] = useState<TCategory>();
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const loadingCategory = openCategory && category?.name.length === 0;

  useEffect(() => {
    (async (): Promise<void> => {
      const getCategory = useAxios({ url: 'category' });
      const [{ response: categoryResponse }] = await Promise.all([getCategory]);
      if (categoryResponse) {
        const categoryDefault = {
          id: 0,
          name: 'Escolha uma categoria',
          description: 'Escolha uma categoria',
        };
        setCategories([categoryDefault, ...categoryResponse.data]);
        setCategory(categoryDefault);
      }
    })();
  }, []);

  return (
    <>
      <SiteMenu />
      <Container maxWidth='lg' sx={{ marginTop: 2 }}>
        <Grid
          container
          maxWidth='100%'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '5px',
            textAlign: 'center',
            border: '1px solid #ccc',
          }}
        >
          <Grid item xs={12} md={12} sm={12} lg={12}>
            {categories.length > 0 && (
              <Autocomplete
                id='categories'
                size='small'
                value={category}
                onChange={(_, value): void => {
                  setCategory(value as TCategory);
                }}
                onOpen={(): void => {
                  setOpenCategory(true);
                }}
                onClose={(): void => {
                  setOpenCategory(false);
                }}
                options={categories}
                isOptionEqualToValue={(option, value): boolean => option.id === value.id}
                getOptionLabel={(option): string => `${option.id} - ${option.name}`}
                loading={loadingCategory}
                renderInput={(params): React.ReactNode => (
                  <TextField
                    {...params}
                    label='Categorias'
                    sx={{ maxWidth: '80%', marginTop: '10px' }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingCategory ? <CircularProgress color='inherit' /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            )}
            <TextField
              id='description'
              label='Descrição'
              variant='standard'
              sx={{ marginRight: '10px', marginTop: '10px' }}
            />
            <TextField id='value' label='Valor' variant='standard' sx={{ marginRight: '10px', marginTop: '10px' }} />
            <Stack
              direction='row'
              sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }}
              alignItems='center'
            >
              <Typography>Saida</Typography>
              <Switch id='status' size='small' defaultChecked />
              <Typography>Entrada</Typography>
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
              <MobileDatePicker
                showToolbar={true}
                label='Data do lançamento'
                inputFormat='DD/MM/YYYY HH:mm'
                value={insertDate}
                onChange={setInsertDate}
                renderInput={(params: TextFieldProps): JSX.Element => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Button
            id='voucher'
            startIcon={<CloudUploadIcon />}
            variant='outlined'
            component='label'
            sx={{ marginTop: '10px', width: '80%', alignSelf: 'center' }}
          >
            Enviar Comprovante
            <input
              type='file'
              // onChange={(evt): void => showImageBase64(evt.target.files as FileList)}
              required={true}
              hidden
            />
          </Button>

          <ButtonGroup variant='outlined' sx={{ alignSelf: 'center', marginTop: '5px' }} aria-label='Actions'>
            <Button color='primary'>Salvar</Button>
            <Button color='error'>Excluir</Button>
          </ButtonGroup>
        </Grid>
        <Grid
          container
          maxWidth='100%'
          sx={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Button variant='outlined' startIcon={<AddIcon />}>
            Adicionar
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default Releases;
