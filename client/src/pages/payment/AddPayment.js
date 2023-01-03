import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';


// @mui
import { Container, Stack,TextField,Alert, Typography, Button, FormControl, InputLabel, Input, FormHelperText} from '@mui/material';
import api from '../../utils/api';
import Iconify from '../../components/iconify';


// components
import { ProductCartWidget} from '../../sections/@dashboard/products';
import SelectLabels from './SelectLabels';


// ----------------------------------------------------------------------

export default function AddPayment() {
 
const [formData, setFormData] = useState({})
const [error, setError] = useState("")

const Navigate = useNavigate();

const onChange = (e)=>{
  setFormData((prevState) =>({
    ...prevState,
    [e.target.name]:e.target.value
  }))
}

const AddPayment = async () => {
      console.log(formData);
      await api.post('appartement/add', formData).then((Response)=>{
        console.log(Response);
        setError("")
        // window.location = "projects"
      }).catch((Error)=>{
        console.log(Error.response.data.message);
        setError(Error.response.data.message)
      })
  
}

  return (
    <>
      <Helmet>
        <title> addProject </title>
      </Helmet>

      <Container>

      <Stack direction="row" alignItems="center" justifyContent="space-between" flexShrink={0} sx={{ mx: 2  }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
      AddPayment
        </Typography>

      </Stack>

      <form className='mx-4'>
      {error && <Alert severity="error" sx={{ mb:2}}>{error}</Alert>}

      <div className="mb-3">
          <SelectLabels handleChange={onChange}/>
        </div>
        <div className="mb-3">
          <TextField id="outlined-basic"   name='Numero' label="Numero d'appartement" onChange={onChange} variant="outlined" sx={{ width: "100%"}}/>
        </div>
        <div className="mb-3">
          <TextField id="outlined-basic" label="carte national client" name='CnClient' variant="outlined" onChange={onChange} sx={{ width: "100%" }} />
        </div>
        <div className="mb-3">
          <TextField id="outlined-basic"   name='Etage' label="Numero Etage" onChange={onChange} variant="outlined" sx={{ width: "100%"}}/>
        </div>
        

        <Button sx={{ width: "100%" }} size="medium" onClick={AddPayment} variant="contained" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Add
          </Button>
      </form>
        <ProductCartWidget />
      </Container>
    </>
  );
}
