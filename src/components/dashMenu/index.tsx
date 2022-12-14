/* eslint-disable react/jsx-no-undef */
import React, { memo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ListItemText, Drawer, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import routes from 'routes/routes';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthProvider/useAuth';

function DashMenu(): JSX.Element {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawer, setDrawer] = useState(false);
  const authUser = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    authUser.logout();
    // navigate('/login');
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawer(open);
  };

  return (
    <>
      {/* style={{ backgroundColor: '#00182c' }} */}
      <div>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: 'rgb(53, 58, 60)',
              color: '#90caf9',
            },
          }}
          anchor='left'
          open={drawer}
          onClose={(): void => setDrawer(false)}
        >
          <Box role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
              <ListItem
                onClick={(): void => {
                  navigate('/');
                  setDrawer(false);
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LinkTwoToneIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText primary='Site' />
                </ListItemButton>
              </ListItem>
              {routes
                .filter(route => route.visibleInDisplay && route.locale !== 'site')
                .map(route => (
                  <ListItem
                    key={route.displayName}
                    onClick={(): void => {
                      navigate(route.path);
                      setDrawer(false);
                    }}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <LinkTwoToneIcon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText primary={route.displayName} />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Box>
        </Drawer>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Finance
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size='large'
                  aria-label='conta do usu??rio atual'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                  <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
                  <MenuItem onClick={handleLogout}>Sair</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
export default memo(DashMenu);
