import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { spacing } from '@mui/system';
// components


import Iconify from '../../../components/iconify';
import { UserContext } from '../../../utils/UserProvider';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  const {getUserFromToken}  = useContext(UserContext);

	const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)

	const onChange = (e)=>{
		setFormData((prevState) =>({
			...prevState,
			[e.target.name]:e.target.value
		}))
	}

const handleClick = async(e) =>{
	e.preventDefault();
	console.log(formData);

	axios.post("http://localhost:4000/api/auth/login",formData,{withCredentials:true})
	  .then( (response) => {

      getUserFromToken();
      navigate('/dashboard', { replace: true });
	  })
	  .catch((error) =>{
      console.log(error);
      setError(error.response.data.message)
	  })
}

  return (
    <>
      {error && <Alert variant="filled" severity="error" sx={{ mb:2}}>{error}</Alert>}
      <Stack spacing={3}>
        <TextField name="username" label="Username" onChange={onChange} />
        <TextField
          name="password"
          label="Password" onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
