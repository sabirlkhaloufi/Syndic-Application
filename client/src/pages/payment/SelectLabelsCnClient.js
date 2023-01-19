import React, {useEffect, useState} from 'react';
import {InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import api from '../../utils/api';

export default function SelectLabelsCnClient(props) {

  const [CnClients, setCnCient] = useState([])

  const [age, setAge] = React.useState({});
  const handleChange = (event) => {
    setAge({CnClient: event.target.value});
    console.log(age);
  };

  const getAllAppatements = async()=>{
    api.get("appartement/getall").then((Response)=>{
      console.log(Response);
      setCnCient(Response.data)
    }).catch((Error)=>{
      console.log(Error);
    })
  }
  useEffect(() => {
    getAllAppatements();
  }, [])



  return (
      <FormControl sx={{ width: "100%"}}>
        <InputLabel id="demo-simple-select-helper-label">CnClient</InputLabel>
        <Select
          id="demo-simple-select-helper"
          value={age.CnClient}
          label="CnClient"
          name='CnClient'
          variant='outlined'
          onChange={(e) => { props.handleChange(e); handleChange(e); }}
        >

          {CnClients.map((item)=>{
            return(
              <MenuItem value={item.CnClient}>{item.CnClient}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
  );
}