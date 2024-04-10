import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import Avatar from 'react-avatar'

import {useNavigate} from 'react-router-dom'





export default function VoirEleve({retour,value,supprimerEl}) {
const dispatch = useDispatch()
 const navigate=useNavigate()
const modifier=()=>{
  console.log('modifier')
}

  return (
    <div className='z-10 absolute top-[100px] left-[20px] mx-3 bg-slate-100 w-[300px]  border p-3  border-gray-100  rounded-md '>
   <div className='absolute right-0 top-0 m-1 cursor-pointer  z-50 '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>retour()} />
           </div> 
      <div className='flex  flex-col items-center justify-center '>
            <Avatar name={`${value.nom} ${value.prenoms}`}  size="100" round={true} /> 
           <div className='flex  text-lg font-bold tracking-wider text-center w-full justify-center items-center '>
            {value.nom}  {value.prenoms}
          </div>
           <div className='flex  text-md text-green-400   font-normal tracking-widest text-center w-full justify-center items-center '>
            Parent 
          </div>
           <div className='flex  text-md font-bold tracking-wider text-center w-full justify-center items-center '>
            {value.cel}  
          </div>
           <div className="flex justify-start text-red-300 font-medium text-sm items-center gap-1">{value.ville}<div className="w-2 h-2 rounded-full bg-black"/>{value.commune} </div>
       </div>
            
        <div className='flex flex-col items-center my-2  w-full'>
      <div className='flex flex-row '> 
        <button 
       type="button" onClick={()=>navigate(`/modifier/eleves/${value._id}`)} className=" text-green-700  border-r  font-medium  text-sm px-3 py-2 text-center inline-flex items-center">
        Modifier
        </button>
        <button 
       type="button" onClick={()=>supprimerEl(value._id)} className=" text-red-500  font-medium  text-sm px-3 py-2 text-center inline-flex items-center">
        Supprimer
        </button>
      
         </div>
        </div>
    </div>
  )
}
