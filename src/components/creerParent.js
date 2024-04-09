import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";


import {useNavigate} from 'react-router-dom'





export default function CreerParent({retour,value}) {
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
   <form  className='w-[300px]  border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[200px] left-[50px]'>

      <div className='flex flex-col '>
     <p className='text-lg font-semibold text-black tracking-wider mb-3'>Inscription parent</p>             
        <div className='flex flex-col mx-4 space-y-4'>
        <input {...register("nom")}  type='text' placeholder='Nom' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
        <input {...register("prenoms")}  type='text' placeholder='Prenoms' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
        <input {...register("cel")}  type='text' placeholder='Cel' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
        <input {...register("email")}  type='text' placeholder='Email' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
        <input {...register("whatshapp")}  type='text' placeholder='Whatshapp' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
        <input {...register("ville")}  type='text' placeholder='Ville' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
        <input {...register("commune")}  type='text' placeholder='Commune' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
        <input {...register("montantCours")}  type='number' placeholder='Montant du cours à domicile' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
        <input {...register("commission")}  type='number' placeholder='Commission sur le Montant' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
        <input {...register("nombreEnfant")}  type='number' placeholder="Nombre d'enfant à inscrire" className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
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
