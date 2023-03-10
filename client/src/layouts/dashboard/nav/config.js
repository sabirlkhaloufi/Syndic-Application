// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Appartements',
    path: '/dashboard/appartements',
    icon: icon('ic_apart'),
  },
  {
    title: 'Payments',
    path: '/dashboard/Payments',
    icon: icon('ic_pay'),
  }
];

export default navConfig;
