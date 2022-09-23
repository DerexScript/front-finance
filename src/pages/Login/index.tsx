import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { MdLockOutline as LockOutlinedIcon } from 'react-icons/md';
import Typography from '@mui/material/Typography';
import { useAuth } from 'context/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SimpleBackdrop from 'components/atoms/loading2';

function Copyright(props: { sx: { mt: number } }): JSX.Element {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href=''>
        Finance
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Login(): JSX.Element {
  const navigate = useNavigate();
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (auth.token) {
      navigate('/');
    }
    setLoading(false);
  }, []);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color='secondary' size='small' onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields: { [key: string]: string } = {
      credential: data.get('credential') as string,
      password: data.get('password') as string,
      remember: data.get('remember') as string,
    };
    try {
      const isAuth = await auth.authenticate(fields.credential, fields.password);
      if (isAuth) {
        navigate('/Home');
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <>
      {!loading ? (
        <ThemeProvider theme={theme}>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message='Usuario ou senha invalidos'
            action={action}
          />
          <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Entrar
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='user'
                    label='Usuario'
                    name='credential'
                    autoComplete='usuario'
                    autoFocus
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Senha'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                  />
                  <FormControlLabel
                    control={<Checkbox name='remember' value='remember' color='primary' />}
                    label='Lembrar'
                  />
                  <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Entrar
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href='#' variant='body2'>
                        Esqueceu a senha?
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      ) : (
        <SimpleBackdrop state={loading} />
      )}
    </>
  );
}

export default Login;
