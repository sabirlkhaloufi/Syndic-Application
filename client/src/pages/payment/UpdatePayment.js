import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


// @mui
import { Container, Stack,TextField, Typography, Modal, Box, Button, FormControl, InputLabel, Input, FormHelperText, Alert} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Iconify from '../../components/iconify';


// components
import { ProductSort, ProductList, ProductCartWidget} from '../../sections/@dashboard/products';
import api from '../../utils/api';

import SelectLabels from './SelectLabels';

// ----------------------------------------------------------------------

export default function UpdatePayment() {
 
const {id} = useParams();
const [formData, setFormData] = useState({})
const [error, setError] = useState("")

const [value, setValue] = React.useState(dayjs('2014-08-18'));

  const handleChange = (newValue) => {
    setValue(newValue);
    setFormData({Date:value})
  };

const getPayment = async()=>{
  api.get(`payment/getone/${id}`).then((Response)=>{
    console.log(Response);
    setFormData(Response.data)
  }).catch((Error)=>{
    console.log(Error);
  })
}

useEffect(() => {
  getPayment();
}, [])

const onChange = (e)=>{
  setFormData((prevState) =>({
    ...prevState,
    [e.target.name]:e.target.value
  }))
}


const UpdatePayment = async () => {
      await api.put(`payment/update/${id}`, formData).then((Response)=>{
        console.log(Response);
        setError("");
      }).catch((Error)=>{
        console.log(Error);
        setError(Error.response.data.message)
      })
  
}


  
  return (
    <>
      <Helmet>
        <title> UpdatePayment </title>
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
          <SelectLabels handleChange={onChange} value={formData.Apparetement}/>
        </div>
        <div className="mb-3">
          <TextField id="outlined-basic" value={formData.Prix}   name='Prix' label="Prix" onChange={onChange} variant="outlined" sx={{ width: "100%"}}
          InputLabelProps={{
            shrink: true,
          }}/>
        </div>
        <div className="mb-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date"
          inputFormat="YYYY/DD/MM"
          value={formData.Date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
        </div>
        

        <Button sx={{ width: "100%" }} size="medium" onClick={UpdatePayment} variant="contained" startIcon={<Iconify icon="eva:plus-fill"  />}>
            update
          </Button>
      </form>

        <ProductCartWidget />
      </Container>
    </>
  );
}
