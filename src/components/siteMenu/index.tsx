import React, { useState } from 'react';
import { AppBar, Link, Box, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Adb as AdbIcon } from '@mui/icons-material';
import routes from 'routes/routes';
import { useNavigate } from 'react-router-dom';

const pagesRoutes = ['/'];
const settings = ['Dashboard', 'Sair'];
const settingsRoutes = ['/dashboard/', '/logout'];

const SiteMenu = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {routes.length &&
                routes
                  .filter(route => route.visibleInDisplay && route.locale === 'site')
                  .map((page, key) => (
                    <Link
                      key={key}
                      href={pagesRoutes[key]}
                      underline='none'
                      onClick={(): void => {
                        navigate(page.path);
                      }}
                    >
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign='center'>{page.displayName}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.length &&
              routes
                .filter(route => route.visibleInDisplay && route.locale === 'site')
                .map(page => (
                  <Button
                    key={page.path}
                    onClick={(): void => {
                      navigate(page.path);
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.displayName}
                  </Button>
                ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Abrir mais op????es'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='User Profile' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, key) => (
                <Link key={key} href={settingsRoutes[key]} underline='none' variant='inherit'>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SiteMenu;
