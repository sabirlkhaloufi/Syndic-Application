import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// @mui
import { Container, Stack,TextField, Typography, Modal, Box, Button} from '@mui/material';
import api from '../utils/api'
import Iconify from '../components/iconify';
// components
import { ProductSort, ProductList, ProductCartWidget} from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function AppartementPage() {

  const [projects, setProjects] = useState([])
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllAppatements = async()=>{
    api.get("appartement/getall").then((Response)=>{
      console.log(Response);
      setProjects(Response.data)
    }).catch((Error)=>{
      console.log(Error);
    })
  }
  
  useEffect(() => {
    getAllAppatements();
  }, [])



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>

      <Stack direction="row" alignItems="center" justifyContent="space-between" flexShrink={0} sx={{ mx: 2  }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
          appartements
        </Typography>

        <Link to={`/dashboard/addAppartement`}>
          <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>ADD appartement</Button> 
        </Link>
      </Stack>


        <ProductList appatements={projects} getappatements={getAllAppatements} />

        <ProductCartWidget />
      </Container>
    </>
  );
}
