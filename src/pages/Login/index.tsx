/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
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
import useAuth from 'routes/auth';
import { useNavigate } from 'react-router-dom';
import ComponetLoading from 'components/molecules/ComponentLoading';

function Copyright(props: any): JSX.Element {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const auth: { [key: string]: String } = {
      user: data.get('user') as String,
      password: data.get('password') as String,
      remember: data.get('remember') as String,
    };
    if (
      auth.user.length > 0 &&
      auth.password.length > 0 &&
      auth.remember !== null
    ) {
      if (auth.user === 'admin' && auth.password === 'admin') {
        localStorage.setItem('auth', 'asdasd');
        setTimeout(() => {
          navigate('/dashboard/Home');
        }, 3000);
      }
      console.log('auth1');
      console.log(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
        `E-mail: ${auth.user}\nPassword: ${auth.password}\nRemember: ${auth.remember}`
      );
    } else if (
      auth.user.length > 0 &&
      auth.password.length > 0 &&
      auth.remember === null
    ) {
      console.clear();
      console.log('marque o lembrar');
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
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
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='user'
                label='Usuario'
                name='user'
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
                control={
                  <Checkbox name='remember' value='remember' color='primary' />
                }
                label='Lembrar'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
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
  );
}

export default Login;
