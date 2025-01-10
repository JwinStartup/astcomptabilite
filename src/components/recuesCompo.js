import React from 'react'
import { FaUserTie } from "react-icons/fa6"
export default function RecuesComponent({recue}){
  return(
    <div className='border rounded-md  px-2'>
           <div className='flex items-center mx-2'> 
        <div className='font-bold  tracking-tight text-[18px] text-black '>Reçue</div>
        <div className='font-medium  tracking-tight text-[11px] text-green-400 '>N°{recue?._id.slice(recue?._id.length-3)} </div>
      </div> 
      <div className='flex flex-col w-full'>
        <div className='ml-2'>
        <div className='text-sm font-medium text-gray-500 flex flex-row'><FaUserTie size={20} color="gray" />{recue?.client?.nom} {recue?.client?.prenoms} </div>
        </div>
        <div className='ml-2 flex flex-col justify-center'>
            <div className='font-bold  tracking-wide text-sm text-black '>{recue?.montant} FCFA</div>
            <div className= {`text-red-400 font-medium text-start tracking-tight text-[11px] `} >Montant payé </div>
        </div>

      </div>
            <div className='ml-2 font-bold  tracking-tight text-xs text-black '>Periode: <span className='text-gray-400'> {recue?.periodeAjouter}  </span></div>
          </div>
  )
    }
