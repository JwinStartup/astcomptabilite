import React,{useContext,useState} from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import {UserContext} from './authContext'

const PrivateRouter =()=>{
const { login,logout, user } = useContext(UserContext);
const  [useur,setUseur] =useState(user)
return(
  useur.me!==null?<Outlet/>:<Navigate to="/login"  />
)
}
export default PrivateRouter
