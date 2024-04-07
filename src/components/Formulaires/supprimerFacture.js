import React from 'react'
import { useDispatch } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';
export default function SupprimerFacture({retour,value}) {
   const dispatch=useDispatch()
   const supprimer=()=>{
    dispatch(comptabiliteActions.supprimerFacture(value._id)).then(()=>{
   retour()
   })
  }
  return (
    <div className='w-[300px] space-y-4   items-center justify-center  border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[200px] left-[50px]'>
        <div className='font-bold  tracking-tight text-lg text-black pl-1'>Supprimer une facture</div>
        <p className='font-medium  tracking-tight text-sm text-center' >Souhaitez-vous supprimer la facture  <span className='text-green-400 pl-1'>N* {value._id.slice(value._id.length-6)} </span> </p>

        <div className='flex flex-col items-center pb-3  w-full h-full'>
        <div className='flex flex-row space-x-6'>  <button onClick={()=>retour()} type="button" className="border-r text-red-400 hover:text-red-700   font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center ">
        Retour
       
        </button>
        
        <button type="button"  onClick={()=>supprimer()} className=" text-blue-400 hover:text-blue-700  font-medium  text-sm py-2.5 text-center inline-flex items-center  ">
        Supprimer
       
        </button> </div>
        </div>
    </div>
  )
}
