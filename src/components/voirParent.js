import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import Avatar from 'react-avatar'

import {useNavigate} from 'react-router-dom'





export default function VoirParent({retour,value}) {
const dispatch = useDispatch()
const modifier=()=>{
  console.log('modifier')
}
const supprimer=()=>{
  console.log('supprimer')
}
  return (
    <div className='relative mx-3 bg-slate-100 w-[300px]  border p-3  border-gray-100  rounded-md '>

   <div className='absolute right-0 top-0 m-1 cursor-pointer  z-50 '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>retour()} />
           </div> 
      <div className='flex  flex-col items-center justify-center '>
            <Avatar name={`${value.nom} ${value.prenoms}`}  size="100" round={true} /> 
           <div className='flex  text-lg font-bold tracking-wider text-center w-full justify-center items-center '>
             {value.nom} {value.prenoms}
          </div>
       </div>
            
        <div className='flex flex-col items-center my-2  w-full'>
      <div className='flex flex-row '> 
        <button 
       type="button" onClick={()=>retour()} className=" text-blue-700 font-medium border-r text-sm px-3 py-2 text-center inline-flex items-center">
        Retour
        </button>
        <button 
       type="button" onClick={()=>modifier()} className=" text-green-700  font-medium  text-sm px-3 py-2 text-center inline-flex items-center">
        Modifier
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
