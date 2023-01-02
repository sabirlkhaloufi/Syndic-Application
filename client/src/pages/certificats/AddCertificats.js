import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


// @mui
import { Container, Stack,TextField, Typography, Modal, Box, Button, FormControl, InputLabel, Input, FormHelperText} from '@mui/material';
import axios from 'axios';
import Iconify from '../../components/iconify';


// components
import { ProductSort, ProductList, ProductCartWidget} from '../../sections/@dashboard/products';
import MultipleSelectChip from './MultipleSelectChip';

// ----------------------------------------------------------------------

export default function AddProject() {
 
const [dataForm, setFormData] = useState({})
const [Technologies, setTechnologies] = useState([])

const Navigate = useNavigate();


const onChange = (e)=>{
  setFormData((prevState) =>({
    ...prevState,
    [e.target.name]:e.target.value
  }))
}

const [multipleFiles, setMultipleFiles] = useState('');
const [multipleProgress, setMultipleProgress] = useState(0);

const MultipleFileChange = (e) => {
  setMultipleFiles(e.target.files);
  setMultipleProgress(0);
}


const mulitpleFileOptions = {
  onUploadProgress: (progressEvent) => {
      const {loaded, total} = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
  }
}

const UploadMultipleFiles = async () => {
  console.log(Technologies);
  const formData = new FormData();
  formData.append('title', dataForm.title);
  formData.append('description', dataForm.description);
  formData.append('lienGihtub', dataForm.github);
  formData.append('Demo', dataForm.demo);
  formData.append('technologies', Technologies)
  for (let i = 0; i < multipleFiles.length; i += 1) {
      formData.append('files', multipleFiles[i]);                      
  }
  await multipleFilesUpload(formData, mulitpleFileOptions);
}


const multipleFilesUpload = async (data, options) => {
      await axios.post('http://localhost:4000/api/projects/add', data, options).then((Response)=>{
        console.log(Response);
        window.location = "projects"
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
          add projects
        </Typography>

      </Stack>

      <form className='mx-4'>
      <div className="mb-3 d-flex align-items-center gap-2">
      <input type="file" onChange={(e) => MultipleFileChange(e)} className="form-control" multiple />    

      <div className="col-2" style={{ width: 80}}>
                        <CircularProgressbar
                            value={multipleProgress}
                            text={`${multipleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                textColor: '#3e98c7',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',

                                
                              })}
                        />
                    </div>
      </div>
     
        <div className="mb-3">
          <TextField id="outlined-basic"   name='Title' label="title" onChange={onChange} variant="outlined" sx={{ width: "100%"}}/>
        </div>
        <div className="mb-3">
          <TextField id="outlined-basic" label="Description" name='description' variant="outlined" onChange={onChange} sx={{ width: "100%" }} />
        </div>
        <div className='d-flex justify-content-between mb-3 gap-2'>
        
            <TextField id="outlined-basic" label="Lien Demo" variant="outlined" name='demo' onChange={onChange} sx={{ width: "100%" }} />
        
        
            <TextField id="outlined-basic" label="Lien Github" variant="outlined" name='github' onChange={onChange} sx={{ width: "100%" }} />
        
        </div>
        <div className="mb-3">
            <MultipleSelectChip setTechno={setTechnologies}/>
        </div>


        
        <Button sx={{ width: "100%" }} size="medium" onClick={UploadMultipleFiles} variant="contained" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Add
          </Button>
      </form>


        

        <ProductCartWidget />
      </Container>
    </>
  );
}
