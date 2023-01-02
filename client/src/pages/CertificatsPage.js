import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
// @mui
import { Container, Stack,TextField, Typography, Modal, Box, Button, Link} from '@mui/material';
import axios from 'axios';
import Iconify from '../components/iconify';
// components
import { ProductSort, ProductList, ProductCartWidget} from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function CertificatsPage() {

  const [projects, setProjects] = useState([])
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllProjects = async()=>{
    axios.get("http://localhost:4000/api/projects/getall").then((Response)=>{
      console.log(Response);
      setProjects(Response.data)
    }).catch((Error)=>{
      console.log(Error);
    })
  }
  useEffect(() => {
    getAllProjects();
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
        <title> Dashboard: certificats | Minimal UI </title>
      </Helmet>

      <Container>

      <Stack direction="row" alignItems="center" justifyContent="space-between" flexShrink={0} sx={{ mx: 2  }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
          projects
        </Typography>

        <Link href={`addProject`}>
          <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>ADD PROJECT</Button> 
          </Link>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField sx={{ width: '10%' }} id="outlined-basic" label="Outlined" variant="Title"  />
            <TextField id="outlined-basic" label="Outlined" variant="Description" />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </Typography>
          </Box>
        </Modal>   
      </Stack>


        <ProductList products={projects} projects={getAllProjects} />

        <ProductCartWidget />
      </Container>
    </>
  );
}
