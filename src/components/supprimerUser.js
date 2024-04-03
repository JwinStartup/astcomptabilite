import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { userActions } from '../reducer/user.js'
export default function SupprimerUser({retour,value}) {
const dispatch=useDispatch()
  const supprimer=()=>{
    dispatch(userActions.supprimer(value._id)).then(()=>retour())
  }
  return (
    <div className='w-[500px] space-y-4 h-[200px]  items-center justify-center  border p-3 bg-white border-gray-100 shadow-md rounded-3xl   z-10 absolute top-[125px] left-[400px]'>
    <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Supprimer une charge</div>
    <p className='font-lg  tracking-tight text-[18px] text-center' >Souhaitez-vous supprimer l'utilisateur  <span className='font-lg  tracking-tight text-[18px] text-green-400 pl-1'>N*{value.nom}  </span> </p>

    <div className='flex flex-col items-center  w-full h-full'>
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
