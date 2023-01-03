import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';


// @mui
import { Container, Stack,TextField,Alert, Typography, Button, FormControl, InputLabel, Input, FormHelperText} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import api from '../../utils/api';
import Iconify from '../../components/iconify';


// components
import { ProductCartWidget} from '../../sections/@dashboard/products';
import SelectLabels from './SelectLabels';


// ----------------------------------------------------------------------

export default function AddPayment() {
 
const [formData, setFormData] = useState({})
const [error, setError] = useState("")



const [value, setValue] = React.useState(dayjs('2014-08-18'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

const Navigate = useNavigate();

const onChange = (e)=>{
  setFormData((prevState) =>({
    ...prevState,
    [e.target.name]:e.target.value
  }))
}

const AddPayment = async () => {
      console.log(formData);
      formData.Date = value.$d;
      await api.post('payment/add', formData).then((Response)=>{
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
          <TextField id="outlined-basic"   name='Prix' label="Prix" onChange={onChange} variant="outlined" sx={{ width: "100%"}}/>
        </div>
        <div className="mb-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date"
          inputFormat="YYYY/DD/MM"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
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
