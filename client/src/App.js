// routes
import React , {useContext} from 'react';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './utils/UserProvider';




// ----------------------------------------------------------------------

export default function App() {
  const {getUserFromToken}  = useContext(UserContext);
  getUserFromToken();

  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
