import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute(){
  const [cookie] = useCookies();
  const token = cookie.token;
  return(
    <div>
      {token ? <Outlet/> : <Navigate to="/login"/>}
    </div>
  )
}

export default ProtectedRoute