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
import api from '../../../utils/api';

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

export default function ShopProductCard({ appartement, getappatements }) {
  const { Numero, CnClient, Etage, _id} = appartement;

  const deleteAppartement = (id)=>{
    api.delete(`appartement/delete/${id}`).then((Response)=>{
      console.log(Response.data);
       getappatements();
    }).catch( (Error)=>{
      console.log(Error);
    })
  }
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>

        <StyledProductImg alt={"img"} src={`https://images.prismic.io/emerige-2018%2F2ae6853b-eb0c-461b-8b9e-0375158eb532_suresnes-decour-livraison-residence-jardin-web-min.jpg?auto=compress,format&rect=0,57,1296,639&w=872&h=430`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {Numero}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="contained" size='small' color="error" onClick={()=>{deleteAppartement(_id)}} sx={{ mr: 1 }}>
          <DeleteIcon />
          </Button>

          <Link href={`updateAppartement/${_id}`}>
          <Button variant="contained" size='small' color="primary">
          <EditIcon />
          </Button>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
