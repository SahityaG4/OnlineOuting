import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {NavLink} from 'react-router-dom';


const pages = ['Student','Faculty', 'Warden'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [isLoggedIn, setisLoggedIn] = React.useState(null);
  const [isLoggedOut, setisLoggedOut] = React.useState(null);
 const logIn = () => {
 setisLoggedIn(true);
 };
 const logOut = () => {
 setisLoggedIn(false);
 };

  return (
    <Box >
    <AppBar position="static" bgcolor= "black" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Vishnu Outing Management System
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><NavLink style={{textDecoration:'none', color : 'black'}} to={`/${page}`}>
                {page}
                </NavLink></Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink style={{textDecoration:'none', color : 'black'}} to={"/Admin"}>
                Admin
                </NavLink></Typography>
                </MenuItem>
              
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           Vishnu
          </Typography>
          <Box sx={{ flexGrow: 1,  display: { xs: 'none', md: 'flex', justifyContent: "flex-end" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink style={{textDecoration:'none', color : 'white'}} to={`/${page}`}>
                {page}
                </NavLink>
              </Button>
            ))}
            <NavLink style={{textDecoration:'none', color : 'white'}} to={`/Admin`}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              
              Admin
            </Button>
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
  );
};
export default ResponsiveAppBar;
