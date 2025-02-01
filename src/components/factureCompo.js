import React from "react"
import { FaUserTie } from "react-icons/fa6"
export default function FactureComponent({facture}){
console.log('les factures dans components:',facture)
  return(
      <div className='border rounded-md  px-2'>
           <div className='flex items-center mx-2'> 
        <div className='font-bold  tracking-tight text-[18px] text-black '>Facture</div>
        <div className='font-medium  tracking-tight text-[11px] text-green-400 '>N°{facture?._id.slice(facture?._id.length-3)} </div>
      </div> 
      <div className='flex flex-col w-full'>
        <div className='ml-2'>
        <div className='text-sm font-medium text-gray-500 flex flex-row'><FaUserTie size={20} color="gray" />{facture?.client?.nom} {facture?.client?.prenoms} </div>
        </div>
        <div className='ml-2 flex flex-col justify-center'>
            <div className='font-bold  tracking-wide text-sm text-black '>{facture?.montant} FCFA</div>
            {facture?.type==="paye"?<div className= {`text-green-400 font-medium text-start tracking-tight text-[11px] `} >Montant payé </div>:<div className= {`text-red-400 font-medium text-start tracking-tight text-[11px] `} >Montant impayé</div>}
        </div>

      </div>
            <div className='ml-2 font-bold  tracking-tight text-xs text-black '>Periode: <span className='text-gray-400'> {facture?.periodeAjouter}  </span></div>
          </div>
  )
}
