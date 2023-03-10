import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';


// @mui
import { Container, Stack,TextField, Typography, Button, FormControl, FormHelperText, Alert} from '@mui/material';
import Iconify from '../../components/iconify';


// components
import {ProductCartWidget} from '../../sections/@dashboard/products';
import api from '../../utils/api';


// ----------------------------------------------------------------------

export default function UpdateAppartement() {
 
const {id} = useParams();
const [formData, setFormData] = useState({})
const [error, setError] = useState("")
const Navigate = useNavigate();


const getAppatement = async()=>{
  api.get(`appartement/getone/${id}`).then((Response)=>{
    console.log(Response);
    setFormData(Response.data)
  }).catch((Error)=>{
    console.log(Error);
  })
}

useEffect(() => {
  getAppatement();
}, [])

const onChange = (e)=>{
  setFormData((prevState) =>({
    ...prevState,
    [e.target.name]:e.target.value
  }))
}


const updateAppartement = async (data, options) => {
      await api.put(`appartement/update/${id}`, formData).then((Response)=>{
        console.log(Response);
        Navigate("/dashboard/appartements")
      }).catch((Error)=>{
        console.log(Error);
      }) 
}


  
  return (
    <>
      <Helmet>
        <title> UpdateAppartement </title>
      </Helmet>

      <Container>

      <Stack direction="row" alignItems="center" justifyContent="space-between" flexShrink={0} sx={{ mx: 2  }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
          Update Appartement
        </Typography>

      </Stack>

      <form className='mx-4'>
      {error && <Alert severity="error" sx={{ mb:2}}>{error}</Alert>}
        <div className="mb-3">
          <TextField id="outlined-basic"   name='Numero' label="Numero d'appartement"  onChange={onChange} variant="outlined" sx={{ width: "100%"}} value={formData.Numero}
          InputLabelProps={{
            shrink: true,
          }}
          
          />
        </div>
        <div className="mb-3">
          <TextField id="outlined-basic" label="carte national client" name='CnClient' variant="outlined" onChange={onChange} sx={{ width: "100%" }} value={formData.CnClient}
          InputLabelProps={{
            shrink: true,
          }} />
        </div>
        <div className="mb-3">
          <TextField id="outlined-basic" label="carte national client" name='NameClient' variant="outlined" onChange={onChange} sx={{ width: "100%" }} value={formData.NameClient}
          InputLabelProps={{
            shrink: true,
          }} />
        </div>
        <div className="mb-3">
          <TextField id="outlined-basic" type='number'   name='Etage' label="Numero Etage" onChange={onChange} variant="outlined" sx={{ width: "100%"}} value={formData.Etage}
          InputLabelProps={{
            shrink: true,
          }}/>
          
        </div>
        {/* <div className="mb-3">
          <SelectLabels handleChange={onChange} value={formData.Isrented}/>
        </div> */}

        <Button sx={{ width: "100%" }} size="medium" onClick={updateAppartement} variant="contained" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Update
          </Button>
      </form>

        <ProductCartWidget />
      </Container>
    </>
  );
}
