import React, {useState, createContext, useEffect} from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

 export const UserContext = createContext();

 const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [cookies, setCookie] = useCookies();

    const getUserFromToken = ()=>{
     
        const auth = cookies;
        if(auth){
           const user = jwtDecode(auth.token);
            setUser(user);
        }
       
    }

    return (
      <UserContext.Provider value={{ user, getUserFromToken }}>
        {props.children}
      </UserContext.Provider>
    );
  }

  export default UserProvider

