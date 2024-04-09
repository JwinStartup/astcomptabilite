import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";


import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';




export default function CreerEleve({retour,value}) {
const dispatch = useDispatch()
const modifier=()=>{
  console.log('modifier')
}
const supprimer=()=>{
  console.log('supprimer')
}
  return (
  <form  className='w-[300px]  border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[200px] left-[50px]'>
            
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
    </form>
  )
}
