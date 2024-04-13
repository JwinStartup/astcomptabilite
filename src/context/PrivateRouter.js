import React,{useContext,useState} from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import {UserContext} from './authContext'
import { history } from '../helper/helper'
import { useSelector } from 'react-redux';

const PrivateRouter =({children})=>{
// const { login,logout, user } = useContext(UserContext);
   const {auth} = useSelector((state)=>{
    return state.userReducer
   });
 console.log(auth)
const  [useur,setUseur] =useState(user)
 // useur.me!==null?<Outlet/>:<Navigate to="/login"  />
   if (!auth) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    return children;
}
export default PrivateRouter
