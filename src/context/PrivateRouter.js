import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
const PrivateRouter =()=>{
const cookie = document.cookie
return(cookie?<Outlet/>:<Navigate to="/login"  />
)
}
export default PrivateRouter