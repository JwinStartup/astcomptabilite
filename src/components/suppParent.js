import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import { userActions } from '../reducer/user.js'

import {useNavigate} from 'react-router-dom'





export default function SupprimerParent({retour,value}) {
const dispatch = useDispatch()
  const supprimer=()=>{
    console.log(value)
    dispatch(userActions.supprimerParent(value._id)).then(()=>{
   retour()
   })
  }

const supprimer=()=>{
  console.log('supprimer')
}
  return (
    <div className='relative mx-3 bg-slate-100 w-[300px]  border p-3  border-gray-100  rounded-md '>
            <div className='font-bold  tracking-tight text-lg text-black pl-1'>Supprimer un parent</div>
          <p className='font-lg  tracking-tight text-md text-center' >Souhaitez-vous supprimer le parent  <span className='font-lg  tracking-tight text-[18px] text-green-400 pl-1'>{value.nom} {value.prenoms} </span> </p>
 
        <div className='flex flex-col items-center my-2  w-full'>
      <div className='flex flex-row '> 
        <button 
       type="button" onClick={()=>retour()} className=" text-blue-700 font-medium border-r text-sm px-3 py-2 text-center inline-flex items-center">
        Retour
        </button>
        <button 
       type="button" onClick={()=>supprimer()} className=" text-green-700  font-medium  text-sm px-3 py-2 text-center inline-flex items-center">
        Supprimer
        </button>
      
         </div>
        </div>
    </div>
  )
}
