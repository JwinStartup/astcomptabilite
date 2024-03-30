import react,{createContext,useState,useReducer} from 'react'
import {userReducer} from '../reducer/user'
export const UserContext =createContext({auth:false,user:null})

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ me:null, auth: true });
  const [useur,dispatch]=useReducer(userReducer)
   console.log(useur)
  // Login updates the user data with a name parameter
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
