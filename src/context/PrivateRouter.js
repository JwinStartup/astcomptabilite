import React,{useContext,useState} from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import {UserContext} from './authContext'
import { history } from './helper/helper'
const PrivateRouter =()=>{
const { login,logout, user } = useContext(UserContext);
const  [useur,setUseur] =useState(user)
return(
 // useur.me!==null?<Outlet/>:<Navigate to="/login"  />
   if (useur.me===null) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    return children;
)
}
export default PrivateRouter
