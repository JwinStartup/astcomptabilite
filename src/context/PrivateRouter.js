import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import cookie from 'react-cookies'
const PrivateRouter =()=>{
const cookies = cookie.load('userId')
return(cookies?<Outlet/>:<Navigate to="/login"  />
)
}
export default PrivateRouter
