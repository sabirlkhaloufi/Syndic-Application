import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ appatements,getappatements, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {appatements.map((appartement) => (
        <Grid key={appartement._id} item xs={12} sm={6} md={3}>
          <ShopProductCard appartement={appartement} getappatements={getappatements} />
        </Grid>
      ))}
    </Grid>
  );
}
