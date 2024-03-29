import react from 'react'
export default react.createContext({
    auth:false,
    user:null
})

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [me, setMe] = useState({ user:null, auth: true });

  // Login updates the user data with a name parameter
  const login = (user) => {
    setUser((user) => ({
      user: user,
      auth: true,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      user: null,
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ me, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
