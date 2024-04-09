import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from 'react-hook-form';

import {useNavigate} from 'react-router-dom'





export default function CreerParent({retour,value}) {
const dispatch = useDispatch()
  const { register, handleSubmit,
     } = useForm(
   );
const creer=()=>{
  console.log('modifier')
}
  return (
   <form  className='w-[300px]  border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[100px] left-[50px]'>
      <div className='absolute right-0 top-0 m-1 cursor-pointer  z-50 '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>supprimer()} />
           </div> 
      <div className='flex flex-col '>
     <p className='text-lg font-semibold text-black tracking-wider mb-3'>Inscription parent</p>             
        <div className='flex flex-col mx-4 space-y-2'>
        <input {...register("nom")}  type='text' placeholder='Nom' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
        <input {...register("prenoms")}  type='text' placeholder='Prenoms' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
        <input {...register("cel")}  type='text' placeholder='Cel' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
        <input {...register("email")}  type='text' placeholder='Email' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
        <input {...register("whatshapp")}  type='text' placeholder='Whatshapp' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
        <input {...register("ville")}  type='text' placeholder='Ville' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
        <input {...register("commune")}  type='text' placeholder='Commune' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
        <input {...register("montantCours")}  type='number' placeholder='Montant du cours à domicile' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
        <input {...register("commission")}  type='number' placeholder='Commission sur le Montant' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
        <input {...register("nombreEnfant")}  type='number' placeholder="Nombre d'enfant à inscrire" className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
       </div>
       </div>





   
        <div className='flex flex-col items-center my-2  w-full'>
    
        <button 
       type="button" onClick={()=>creer()} className=" text-green-700  font-medium  text-sm px-3 py-2 text-center inline-flex items-center">
        S'inscrire
        </button>
       
      
       
        </div>
    </form>
  )
}
