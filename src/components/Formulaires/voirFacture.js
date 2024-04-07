import React,{useEffect,useState,} from 'react'
import {PDFfacture} from '../PDFfacture'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../../reducer/comptabilite.js'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";


import {useNavigate} from 'react-router-dom'





export default function VoirFacture({payer,voirRecue,value,modifier,partager,supprimer}) {
const dispatch = useDispatch()

  return (
    <div className='relative mx-3 bg-slate-100 w-[300px]  border p-3  border-gray-100  rounded-md '>
           <div className='absolute right-0 top-0 m-1 cursor-pointer '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>supprimer()} />
           </div> 
      <div className='flex flex-row justify-between w-full'> 
        <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Facture</div>
        <div className='font-medium mt-2  tracking-tight text-[14px] text-green-400 px-3'>N° {value._id.slice(value._id.length-3)} </div>
      </div> 
      <div className='flex flex-row w-full  justify-between my-2'>
        <div className='ml-2'>
        <div className='text-sm font-bold text-gray-500'>{value.client.nom} {value.client.prenoms}</div>
        <div className='text-sm font-medium text-gray-500'>{value.client.cel}</div>
        </div>
        <div>
             <div className='font-bold  tracking-wide text-sm text-black '>{value.montant} FCFA</div>
            <div className='font-medium text-center tracking-tight text-[11px] text-gray-400 '>Montant</div>
        </div>

      </div>
            <div className='mx-2 font-medium  tracking-tight text-sm text-black '>Periode : {value.periodeAjouter}</div>
        <div className='  mt-2'>
        <table className="w-full ">
  <thead>
    <tr className="">
      <th  className='border-b-2 text-gray-400 text-start  text-xs '>Designation</th>
      <th  className='border-b-2 text-gray-400 text-start  text-xs'>Montant</th>
      <th  className='border-b-2 text-gray-400 text-start  text-xs'>Type</th>
      
    </tr>
  </thead>
  <tbody>
  <tr className='odd:bg-gray-200  bg-white rounded-3xl h-14 m-2  items-center w-full cursor-pointer'>
      <td className='font-medium text-base text-gray-500 text-start'>Cours à domicile </td>      
      <td className='font-medium text-base text-gray-500 text-start'>{value.montant}</td>
      <td className= { `font-medium text-base text-gray-500 text-start ${value.type==='impaye'?'text-red-500':'text-green-500'}`}>{value.type}</td>
    </tr>
  </tbody>
</table>
        </div>
        <div className='flex flex-col items-center my-2  w-full'>
<div className='flex flex-row '> 
     {value.type==='impaye'?  <button onClick={()=>payer()} 
       type="button" className=" text-red-400    font-medium border-r text-sm px-3 py-2 text-center inline-flex items-center ">
        Payer
        </button>: <button onClick={()=>voirRecue()} 
       type="button" className=" text-red-800    font-medium border-r text-sm px-1 py-2 text-center inline-flex items-center ">
        Voir reçue
        </button>}
        <button 
       type="button" onClick={()=>modifier()} className=" text-blue-700 font-medium border-r text-sm px-2 py-2 text-center inline-flex items-center">
        Modifier
        </button>
        <button 
       type="button" onClick={()=>partager()} className=" text-green-700  font-medium  text-sm px-2 py-2 text-center inline-flex items-center">
        Partager
        </button>
      
         </div>
        </div>
    </div>
  )
}

