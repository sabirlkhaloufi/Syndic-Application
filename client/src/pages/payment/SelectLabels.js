import React from 'react';
import {InputLabel, MenuItem, FormControl, Select} from '@mui/material';

export default function SelectLabels(props) {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(age);
  };

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
          <MenuItem value={1}>loué</MenuItem>
          <MenuItem value={0}>non loué</MenuItem>
        </Select>
      </FormControl>
  );
}