import React from 'react'
import { useDispatch } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';
export default function PartagerFacture({retour,value}) {
   import React from 'react'
import { useDispatch } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';
export default function PartagerFacture({retour,value}) {
   const dispatch=useDispatch()
 
  }
  return (
    <div className='w-[400px] space-y-4   items-center justify-center  border p-3 bg-white border-gray-100 shadow-md rounded-3xl   z-10 absolute top-[50% ] left-[50%]'>
        <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Supprimer une facture</div>
        <p className='font-lg  tracking-tight text-[18px] text-center' >Souhaitez-vous supprimer la facture  <span className='font-lg  tracking-tight text-[18px] text-green-400 pl-1'>N* {value._id.slice(value._id.length-6)} </span> </p>

        <div className='flex flex-col items-center  w-full h-full'>
        <div className='flex flex-row space-x-6'> 
       <button onClick={()=>retour()} 
       type="button" className=" text-red-700    font-medium border-r text-sm px-5 py-2.5 text-center inline-flex items-center ">
        Retour
        </button>
         
        <button 
       type="button" className=" text-bleu-700    font-medium border-r text-sm px-5 py-2.5 text-center inline-flex items-center">
        Telecharger
        </button>
         
        <button type="button"   className=" green-blue-700 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center">
        Partager
        </button>
         </div>
        </div>
    </div>
  )
}
  
  }
  return (
    <div className='w-[500px] space-y-4 h-[200px]  items-center justify-center  border p-3 bg-white border-gray-100 shadow-md rounded-3xl   z-10 absolute top-[125px] left-[400px]'>
        <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Supprimer une facture</div>
        <p className='font-lg  tracking-tight text-[18px] text-center' >Souhaitez-vous supprimer la facture  <span className='font-lg  tracking-tight text-[18px] text-green-400 pl-1'>N* {value._id.slice(value._id.length-6)} </span> </p>

        <div className='flex flex-col items-center  w-full h-full'>
        <div className='flex flex-row space-x-6'>  <button onClick={()=>retour()} type="button" className="text-white bg-red-700 hover:bg-red-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ">
        Retour
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        </button>
        
        <button type="button"  onClick={()=>supprimer()} className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Supprimer
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        </button> </div>
        </div>
    </div>
  )
}
