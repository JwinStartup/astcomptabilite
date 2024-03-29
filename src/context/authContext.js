import react,{createContext} from 'react'
export const UserContext =createContext({auth:false,user:null})

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ me:null, auth: true });

  // Login updates the user data with a name parameter
  const login = (user) => {
    setUser((user) => ({
      me: user,
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
