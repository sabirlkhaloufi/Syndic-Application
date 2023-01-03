import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//


/// appartemenet
import AppartementPage from './pages/AppartementPage';
import AddAppartement from './pages/appartement/AddAppartement'
import UpdateAppartement from './pages/appartement/UpdateAppartement'

/// payment
import PaymentPage from './pages/PaymentPage'
import AddPayment from './pages/payment/AddPayment'
import UpdatePayment from './pages/payment/UpdatePayment'


import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([

    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'appartements', element: <AppartementPage />},
        { path: 'addAppartement', element: <AddAppartement />},
        { path: 'updateAppartement/:id', element: <UpdateAppartement />},

        { path: 'payments', element: <PaymentPage />},
        { path: 'addPayment', element: <AddPayment />},
        { path: 'updatePayment', element: <UpdatePayment />},
      ],
    },
    
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
