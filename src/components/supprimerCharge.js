import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { comptabiliteActions } from '../reducer/comptabilite.js'
export default function SupprimerCharge({retour,value}) {
const dispatch=useDispatch()
  const supprimer=()=>{
    dispatch(comptabiliteActions.supprimerCharge(value._id)).then(()=>
    retour() )
  }
  return (
    <div className='w-[400px] space-y-4 h-[270px]  items-center justify-center  border p-3 bg-white border-gray-100 shadow-md rounded-3xl   z-10 absolute top-[125px] left-[400px]'>
    <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Supprimer une charge</div>
    <p className='font-lg  tracking-tight text-[18px] text-center' >Souhaitez-vous supprimer la  charge  <span className='font-lg  tracking-tight text-[18px] text-green-400 pl-1'>N*{value._id.slice(value._id.length-6)}  </span> </p>

    <div className='flex flex-col items-center pb-3  w-full h-full'>
    <div className='flex flex-row space-x-6'>  <button onClick={()=>retour()} type="button" className="text-white bg-red-700    font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ">
    Retour
    </button>
    
    <button type="button" onClick={()=>supprimer()} className="text-white bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ">
    Supprimer
    </button> </div>
    </div>
</div>
  )
}
