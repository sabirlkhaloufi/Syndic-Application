import { Helmet } from 'react-helmet-async';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import FileDownload from 'js-file-download';


// @mui
import { Container, Stack,TextField,Alert, Typography, Button} from '@mui/material';
import dayjs from 'dayjs';


import api from '../../utils/api';
import Iconify from '../../components/iconify';

// components
import { ProductCartWidget} from '../../sections/@dashboard/products';
import SelectLabelsAppartement from './SelectLabelsAppartement';
import SelectLabelsCnClient from './SelectLabelsCnClient';




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
      await api.post('payment/add', formData).then((Response)=>{
        console.log(Response.data._id);

        setTimeout(() => {
          getPdf(Response.data._id)
        }, 3000);
        
        setError("")
        Navigate("/dashboard/payments")
      }).catch((Error)=>{
        console.log(Error.response.data.message);
        setError(Error.response.data.message)
      })
  
}




const getPdf = async(id)=>{
  api.get(`payment/getpdf/${id}`, { responseType: 'blob' }).then((res) => {
        console.log(res.data);
        FileDownload(res.data,"facture.pdf")
      }).catch((Error)=>{
        console.log(Error);
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
          <SelectLabelsAppartement handleChange={onChange} name={"nAppartement"}/>
        </div>
        <div className="mb-3">
          <SelectLabelsCnClient handleChange={onChange} name={"CnCient"}/>
        </div>
        <div className="mb-3">
          <TextField id="outlined-basic"  type='number'  name='Prix' label="Prix" onChange={onChange} variant="outlined" sx={{ width: "100%"}}/>
        </div>
        <div className="mb-3">
          <div>
            {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
            <input type="date" name='Date' onChange={onChange} className="form-control" aria-describedby="emailHelp" />
          </div>

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
