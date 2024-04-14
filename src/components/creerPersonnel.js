import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
import {useNavigate} from 'react-router-dom'




export default function CreerPersonnel({retour,value}) {
const dispatch = useDispatch()
   const { register, handleSubmit,
         formState:{isSubmitting}
     } = useForm(
   );
const navigate=useNavigate()

  return (
   <div  className='w-[300px] onSubmit={handleSubmit(onSubmit)} border p-6 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[100px] left-[30px]'>
             <div className='absolute right-0 top-0 m-1 cursor-pointer  z-50 '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>retour()} />
           </div> 
         <div className='flex flex-col '>
         <p className='text-lg font-semibold text-black tracking-wider mb-3'>Souhaitez vous inscrire un </p>             

            <div className='flex flex-row items-center my-2  w-full'>
            <button 
              onClick={()=>navigate('/inscription/parents')}  className=" text-black  border-r font-semibold  text-lg px-3 py-2 text-center inline-flex items-center">
               parent
            </button>
            <button 
              onClick={()=>navigate('/inscription/personnels')}  className=" text-black  border-r font-semibold  text-lg px-3 py-2 text-center inline-flex items-center">
            personnel
            </button>
            <button 
              onClick={()=>navigate('/inscription/enfants')}  className=" text-black font-semibold  font-bold  text-lg px-3 py-2 text-center inline-flex items-center">
             élève
            </button>
               </div>
          </div>
        </div>
  )
}
