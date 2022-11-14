import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container } from '@mui/system';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  SvgIconTypeMap,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Add, Delete, Edit, Save } from '@mui/icons-material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import { Buffer } from 'buffer';
import DialogMui from 'components/templates/DialogMUI';
import { ICategory } from './ICategory';
import { IRelease } from './IRelease';
import { toast } from 'react-toastify';
import { useAxios } from 'utils/useAxios';
import { useParams } from 'react-router-dom';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type TProps = {
  categories: ICategory[];
  release?: IRelease;
};

const Release = ({ ...props }: TProps): JSX.Element | null => {
  const [category, setCategory] = useState<ICategory>({} as ICategory);
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [releaseType, setReleaseType] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<Dayjs | null>(dayjs(new Date().toISOString()));
  const [imageFile, setImageFile] = useState<FileList>({} as FileList);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUpdate, setIsUpdate] = useState<boolean>(props.release !== undefined);
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
  const [ButtonIcon, setButtonIcon] = useState<OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string }>(
    Edit,
  );

  const { releaseGroupID } = useParams();

  useEffect((): void => {
    const categoryDefault = {
      id: 0,
      name: 'Escolha uma empresa',
      description: 'Escolha uma empresa',
    };

    setCategory(categoryDefault);

    if (props.release !== undefined && props.release !== null) {
      const category = props.categories.filter(category => category.id === props.release?.category_id);
      setCategory(category[0]);
      setDescription(props.release.description);
      setValue(props.release.value);
      setReleaseType(props.release.type ? 'input' : 'output');
      setReleaseDate(dayjs(new Date(props.release.insert_date).toISOString()));
      setImageSrc(props.release.voucher);
    }
    setLoading(false);
  }, []);

  const showImageBase64 = (files: FileList | null): void => {
    if (files?.length) {
      setImageFile(files as FileList);
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
    } else {
      setImageSrc(``);
      setImageFile({} as FileList);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (
      category.id &&
      category.id !== 0 &&
      description.length &&
      value &&
      releaseType.length &&
      imageFile.length &&
      /image/.test(imageFile[0].type)
    ) {
      const formData = new FormData();
      formData.append('category_id', category.id.toString());
      formData.append('description', description);
      formData.append('value', value.toString());
      formData.append('type', (releaseType === 'input').toString());
      formData.append('insert_date', releaseDate?.format('YYYY/MM/DD HH:mm:ss') as string);
      formData.append('release_group_id', releaseGroupID as string);
      formData.append('voucher', imageFile[0], imageFile[0].name);
      const { response } = await useAxios({ url: `release`, method: 'POST', data: formData });
      if (response) {
        toast.success('Lançamento adicionado com sucesso!');
      }
    } else {
      if (!category.id) {
        toast.warning('Voce deve selecionar uma categoria');
      } else if (category.id === 0) {
        toast.warning('Voce deve selecionar uma categoria');
      } else if (!description.length) {
        toast.warning('Você deve informar uma descrição');
      } else if (!value) {
        toast.warning('Você deve informar um valor');
      } else if (releaseType === undefined) {
        toast.warning('Você deve informar se o lançamento é saida ou entrada');
      } else if (imageFile.length === undefined) {
        toast.warning('Você deve enviar um comprovante');
      } else if (imageFile.length && !/image/.test(imageFile[0].type)) {
        toast.warning('Você só pode enviar imagem como comprovante');
      } else {
        toast.warning('Preencha todos campos.');
      }
    }
  };

  return status === 1 ? (
    <>
      {!loading && (
        <Container maxWidth='xl'>
          <Box
            alignItems={{ md: 'center' }}
            // , pointerEvents: 'none'
            sx={{ display: 'flex', marginBottom: 1, border: '0.4px solid #fff', padding: 1 }}
            flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
          >
            <Box width={{ md: 200, sm: '100%', xs: '100%' }} sx={{ marginTop: 1, marginRight: 1 }}>
              <Autocomplete
                id='autoComplete'
                size='small'
                fullWidth
                value={category}
                sx={{ width: '100%' }}
                onChange={(_, value): void => {
                  setCategory(value as ICategory);
                }}
                options={props.categories}
                isOptionEqualToValue={(option, value): boolean => option.id === value.id}
                getOptionLabel={(option): string => `${option.id} - ${option.name}`}
                loading={loading}
                renderInput={(params): React.ReactNode => (
                  <TextField
                    {...params}
                    label='Categoria'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color='inherit' /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            <TextField
              id='description'
              label='Descrição'
              value={description}
              onChange={(evt): void => {
                setDescription(evt.target.value);
              }}
              size='small'
              variant='standard'
              sx={{ marginRight: 2 }}
            />
            <TextField
              id='value'
              label='Valor'
              value={value}
              onChange={(evt): void => {
                setValue(evt.target.value.replaceAll(',', '.'));
              }}
              inputProps={{
                step: '0.01',
              }}
              size='small'
              type='number'
              variant='standard'
              sx={{ marginRight: 2 }}
            />

            <RadioGroup
              sx={{ margin: 0 }}
              row
              aria-labelledby='input-and-output-radio-buttons'
              name='radio-buttons-group'
              onChange={(evt: ChangeEvent<HTMLInputElement>): void => {
                setReleaseType((evt.target as HTMLInputElement).value);
              }}
              value={releaseType}
              // ((): string | null => {
              //   if (props.release !== undefined) {
              //     return props.release?.type ? 'input' : 'output';
              //   }
              //   return null;
              // })()
            >
              <FormControlLabel value='output' control={<Radio />} label='Saida' />
              <FormControlLabel value='input' control={<Radio />} label='Entrada' />
            </RadioGroup>

            <Box sx={{ marginTop: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                <MobileDatePicker
                  showToolbar={true}
                  label='Data do lançamento'
                  inputFormat='DD/MM/YYYY HH:mm'
                  value={releaseDate}
                  onChange={setReleaseDate}
                  renderInput={(params: TextFieldProps): JSX.Element => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>

            <Box marginLeft={{ sm: 0, xs: 0, md: 2 }} sx={{ marginTop: 1 }}>
              <Button
                sx={{ width: '100%', textAlign: 'center' }}
                id='voucher'
                startIcon={<CloudUploadIcon />}
                variant='outlined'
                component='label'
                size='small'
                color='secondary'
              >
                Enviar Comprovante
                <input
                  type='file'
                  required={true}
                  accept='image/*'
                  onChange={(evt): void => {
                    showImageBase64(evt.target.files as FileList);
                  }}
                  hidden
                />
              </Button>
            </Box>
            <Box
              component='img'
              alignSelf={{ sm: 'center', xs: 'center' }}
              sx={{
                width: 150,
                marginLeft: 1,
                marginTop: 1,
              }}
              alt=''
              src={imageSrc}
            />
            <Stack spacing={2} direction='row' sx={{ marginLeft: 1, justifyContent: 'center' }}>
              {!isUpdate ? (
                <Button variant='text' startIcon={<Add />} onClick={handleSubmit} />
              ) : (
                <Button
                  variant='text'
                  startIcon={<ButtonIcon />}
                  onClick={(): void => {
                    setButtonIcon(Save);
                    console.log(isUpdate);
                  }}
                />
              )}
              {/* <Button variant='text' startIcon={<Delete />} onClick={(): void => setStatus(false)} /> */}
              <DialogMui
                iconStart={<Delete />}
                title='Deseja Excluir?'
                setResultDialog={setStatus}
                entityID={0}
                contentText={`Tem certeza que deseja excluir o lançamento ?`}
                option1='Cancelar'
                option2='Excluir'
                variant='text'
              />
            </Stack>
          </Box>
        </Container>
      )}
    </>
  ) : null;
};

export default Release;
