import PropTypes from 'prop-types';
// @mui
import React from 'react';
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product, projects }) {
  const { title, description, images, lienGihtub, Demo, technologies, _id} = product;
  console.log(images);

  const deleteProject = (id)=>{
    axios.delete(`http://localhost:4000/api/projects/delete/${id}`).then((Response)=>{
      console.log(Response.data);
      projects();
    }).catch( (Error)=>{
      console.log(Error);
    })
  }
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>

        <StyledProductImg alt={"img"} src={`http://localhost:4000/${images[0]}`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="contained" size='small' color="primary" onClick={()=>{deleteProject(_id)}} sx={{ mr: 1 }} startIcon={<DeleteIcon />}>
            Delete
          </Button>

          <Link href={`updateProject/${_id}`}>
          <Button variant="contained" size='small' color="primary" startIcon={<EditIcon />}>
            update
          </Button>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
