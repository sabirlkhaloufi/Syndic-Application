import React, {useEffect, useState} from 'react';
import {InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import api from '../../utils/api';

export default function SelectLabelsAppartement(props) {

  const [appartements, setAppartements] = useState([])

  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(age);
  };


  const getAllAppatements = async()=>{
    api.get("appartement/getall").then((Response)=>{
      console.log(Response);
      setAppartements(Response.data)
    }).catch((Error)=>{
      console.log(Error);
    })
  }
  useEffect(() => {
    getAllAppatements();
  }, [])



  return (
      <FormControl sx={{ width: "100%"}}>
        <InputLabel id="demo-simple-select-helper-label">Apparetement</InputLabel>
        <Select
          id="demo-simple-select-helper"
          value={age}
          label="Apparetement"
          name='Apparetement'
          variant='outlined'
          onChange={(e) => { props.handleChange(e); handleChange(e); }}
        >

          {appartements.map((item)=>{
            return(
              <MenuItem value={item._id}>{item.Numero}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
  );
}