import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite.js'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";


import {useNavigate} from 'react-router-dom'





export default function VoirFacture({value,modifier,supprimer}) {
const dispatch = useDispatch()
const navigate = useNavigate()

  return (
    <div className='relative m-3 bg-slate-100 w-[300px]  border p-3  border-gray-100  rounded-md '>
           <div className='absolute right-0 top-0 m-1 cursor-pointer '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>supprimer()} />
           </div> 
      <div className='flex flex-row justify-between w-full'> 
        <div className='font-bold  tracking-tight text-lg text-black pl-1'>Charge</div>
      </div> 
      <div className='flex flex-row w-full  justify-between my-2'>
        <div className='ml-2'>
        {value.type==='eaucourantintent'?<div className='text-sm font-bold text-gray-500 '>Type: <span className='text-green-500  font-bold'>Eau-Courant-Internet</span> </div>:<div className='text-sm font-bold text-gray-500'>type: {value.type}</div>}
       {value.nomCharge&&<div className='text-sm font-bold text-gray-500'>Nom de la charge: <span className='text-green-500 font-bold'>{value.nomCharge} </span></div>}
        <div className='text-sm font-medium text-gray-500'>Montant:<span className='text-black font-bold'>{value.montant} FCFA </span></div>
        </div>
{value.type==='salaire'&&<div>
             <div className='font-bold  tracking-wide text-sm text-black '>{value.personnel}</div>
            <div className='font-medium text-center tracking-tight text-[11px] text-gray-400 '>personnel</div>
        </div>}

      </div>
            <div className='mx-4 font-medium  tracking-tight text-sm text-black '>{value.observation}</div>
            <div className='font-medium mt-2 tracking-tight text-sm text-black w-full text-end'>{value.periodeAjouter}</div>
        <div className='  mt-2'>
        </div>
        <div className='flex flex-col items-center my-2  w-full'>
    <div className='flex flex-row '> 
        <button 
       type="button" onClick={()=>navigate('/')} className=" text-blue-700 font-medium  text-sm px-3 py-2 text-center inline-flex items-center">
        Modifier
        </button>
         </div>
        </div>
    </div>
  )
}
