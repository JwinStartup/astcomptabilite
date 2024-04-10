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
   <div  className='w-[300px] onSubmit={handleSubmit(onSubmit)} border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[70px] left-[20px]'>
             <div className='absolute right-0 top-0 m-1 cursor-pointer  z-50 '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>retour()} />
           </div> 
         <div className='flex flex-col '>
         <p className='text-lg font-semibold text-black tracking-wider mb-3'>Souhaitez vous inscrire </p>             

            <div className='flex flex-col items-center my-2  w-full'>
            <button 
              onClick={()=>navvigate('/inscription/parents')}  className=" text-black  border-r font-bold  text-lg px-3 py-2 text-center inline-flex items-center">
              un parent
            </button>
            <button 
              onClick={()=>navvigate('/inscription/personnels')}  className=" text-black  border-r font-bold  text-lg px-3 py-2 text-center inline-flex items-center">
           un personnel
            </button>
            <button 
              onClick={()=>navvigate('/inscription/enfants')}  className=" text-black  border font-bold  text-lg px-3 py-2 text-center inline-flex items-center">
            un élève
            </button>
               </div>
          </div>
        </div>
  )
}
