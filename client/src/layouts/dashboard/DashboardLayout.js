import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
//
// import { useSelector } from 'react-redux';

import Header from './header';
import ProtectedRoute from '../../utils/ProtectedRoute'
import Nav from './nav';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // const isLogged = useSelector( state => state.auth.isLogged)
  // console.log(isLogged);

 
    return(
    <StyledRoot>
        <Header onOpenNav={() => setOpen(true)} />
  
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />

        <Main>
        <ProtectedRoute/>
        </Main>
      </StyledRoot>)
  }
  

