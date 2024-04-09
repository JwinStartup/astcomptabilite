import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';




export default function CreerPersonnel({retour,value}) {
const dispatch = useDispatch()
   const { register, handleSubmit,
         formState:{isSubmitting}
     } = useForm(
   );
const modifier=()=>{
  console.log('modifier')
}
const supprimer=()=>{
  console.log('supprimer')
}
  return (
   <form  className='w-[300px] onSubmit={handleSubmit(onSubmit)} border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[70px] left-[20px]'>
             <div className='absolute right-0 top-0 m-1 cursor-pointer  z-50 '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>retour()} />
           </div> 
       <div className='flex flex-col '>
   <p className='text-lg font-semibold text-black tracking-wider mb-3'>Inscription Personnel</p>             
      <div className='flex flex-col mx-4 space-y-2'>
      <input {...register("nom")}   type='text' placeholder='Nom' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
      <input {...register("prenoms")}   type='text' placeholder='Prenoms' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
      <input {...register("cel")}   type='text' placeholder='Cel' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
      <input {...register("email")}   type='email' placeholder='Email' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
      <input {...register("whatshapp")}   type='text' placeholder='Whatshapp' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
      <input {...register("ville")}   type='text' placeholder='ville' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
      <input {...register("commune")}   type='text' placeholder='commune' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
      <select {...register("discipline")} defaultValue='Science' className='outline-none w-[250px] border-b-2 py-1 text-sm'>
            <option>Science </option>
            <option>Litterature</option>
            <option>Mathematique</option>
            <option>Physique chimie</option>
            <option>Histoire Geographie</option>
            <option>Anglais</option>
            <option>Philosophie</option>
        </select>
     </div> 
     </div>


   
        <div className='flex flex-col items-center my-2  w-full'>
      <div className='flex flex-row '> 
        <button 
       type="button" onClick={()=>modifier()} className=" text-green-700  font-medium  text-md px-3 py-2 text-center inline-flex items-center">
        {isSubmitting===false? <span>  Inscrire</span>: <span> Inscrire ...</span>}
        </button>
     
      
         </div>
        </div>
    </form>
  )
}
