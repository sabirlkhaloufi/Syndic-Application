import React, {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

import api from '../utils/api';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [countAppartement, setCountApp] = useState(0)
  const [countPayment, setCountPayment] = useState(0)

  const getNbrAppartements = ()=>{
    api.get("appartement/count").then((Response)=>{
      console.log(Response);
      setCountApp(Response.data.nbr)
    }).catch((error)=>{
      console.log(error);
    })
  }

  const getNbrPayments = ()=>{
    api.get("payment/count").then((Response)=>{
      console.log(Response);
      setCountPayment(Response.data.nbr)
    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(() => {
    getNbrAppartements();
    getNbrPayments();
  }, [])

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Appartement" total={countAppartement} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="payment" total={countPayment} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
