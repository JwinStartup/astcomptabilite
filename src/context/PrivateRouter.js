import React,{useContext,useState} from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import { history } from '../helper/helper'
import { useSelector } from 'react-redux';

const PrivateRouter =({children})=>{
// const { login,logout, user } = useContext(UserContext);
   const {auth} = useSelector((state)=>{
    return state.userReducer
   });
const  [useur,setUseur] =useState(auth)
  useEffect(()=>
              {
               setUseur(JSON.parse(localStorage.getItem('user')))
              },[]
              )
   if (!useur) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    return children;
}
export default PrivateRouter
