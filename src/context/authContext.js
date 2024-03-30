import react,{createContext,useState} from 'react'
import {userReducer} from '../reducer/user'
export const UserContext =createContext({auth:false,user:null})

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ me:null, auth: true });
   console.log(userReducer)
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
