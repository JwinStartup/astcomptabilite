import react,{createContext,useState,useReducer,useEffect} from 'react'
import {userReducer} from '../reducer/user'
export const UserContext =createContext({auth:false,user:null})

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ me:null, auth: true });
  
      useEffect(()=>
              {
                localStorage.setItem('user',JSON.stringify(user))
              },[user]
              )
      useEffect(()=>
              {
               setUser(JSON.parse(localStorage.getItem('user')))
              },[]
              )
    
  const login = (p) => {
    console.log(p)
    setUser(() => ({
      me: p,
      auth: true,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser(() => ({
      me: null,
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
