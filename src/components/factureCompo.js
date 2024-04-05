import React from "react"
import { FaUserTie } from "react-icons/fa6"
export default function FactureComponent({facture}){
  return(
      <div className='border rounded-md w-[170px] px-2'>
           <div className='flex items-center mx-2'> 
        <div className='font-bold  tracking-tight text-[18px] text-black pl-1'>Facture</div>
        <div className='font-medium  tracking-tight text-[14px] text-green-400 pl-1'>N°{facture._id.slice(facture._id.length-3)} </div>
      </div> 
      <div className='flex flex-col w-full'>
        <div className='ml-2'>
        <div className='text-md font-medium text-gray-500 flex flex-row'><FaUserTie size={20} color="gray" />{facture.nom} {facture.prenoms} </div>
        </div>
        <div className='ml-2 flex flex-col justify-center'>
            <div className='font-bold  tracking-wide text-md text-black '>{facture.montant} FCFA</div>
            <div className= {`${facture.type==="paye"?"text-green-400:"text-red-400"} font-medium text-start tracking-tight text-[11px] `} >{facture.type==="paye"?"Montant payé":"Montant impayé"} </div>
        </div>

      </div>
            <div className='ml-2 font-bold  tracking-tight text-xs text-black '>Periode: <span className='text-gray-400'> {facture.periodeAjouter}  </span></div>
          </div>
  )
}
