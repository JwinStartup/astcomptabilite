import react,{createContext,useState,useReducer,useEffect} from 'react'
import {userReducer} from '../reducer/user'
import {Outlet,Navigate} from 'react-router-dom'
export const UserContext =createContext({auth:false,user:null})

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ me:null, auth: true });
      useEffect(()=>
              {
               setUser(JSON.parse(localStorage.getItem('user')))
              },[]
              )
    
  const login = (p) => {
    console.log(p)
     localStorage.setItem('user',JSON.stringify({
      me: p,
      auth: true,
    }))
    setUser(() => ({
      me: p,
      auth: true,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {
     localStorage.setItem('user',JSON.stringify({
      me: null,
      auth: false,
    }))
    setUser(() => ({
      me: null,
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
  {user.me===null?<Navigate to='/login'/>:{children}  }
    </UserContext.Provider>
  );
}
