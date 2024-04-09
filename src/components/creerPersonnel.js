import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from 'react-hook-form';

import {useNavigate} from 'react-router-dom'





export default function CreerPersonnel({retour,value}) {
const dispatch = useDispatch()
  const { register, handleSubmit,
  } = useForm(
);
const modifier=()=>{
  console.log('modifier')
}
const supprimer=()=>{
  console.log('supprimer')
}
  return (
   <form  className='w-[300px]  border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[100px] left-[50px]'>
             <div className='absolute right-0 top-0 m-1 cursor-pointer  z-50 '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>supprimer()} />
           </div> 
       <div className='flex flex-col '>
   <p className='text-2xl font-semibold text-black tracking-wider mb-3'>Inscription Personnel</p>             
      <div className='flex flex-col mx-4 space-y-4'>
      <input {...register("nom")}   type='text' placeholder='Nom' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("prenoms")}   type='text' placeholder='Prenoms' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("cel")}   type='text' placeholder='Cel' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("email")}   type='email' placeholder='Email' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("whatshapp")}   type='text' placeholder='Whatshapp' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("ville")}   type='text' placeholder='ville' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("commune")}   type='text' placeholder='commune' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <select {...register("discipline")} defaultValue='Science' className='outline-none w-[250px] border-b-2 py-1 text-lg'>
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
