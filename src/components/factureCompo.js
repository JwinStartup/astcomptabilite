 import React from "react"

export default function FactureComponent(){
  return(
      <div className='border rounded-md w-[170px] '>
           <div className='flex items-center mx-2'> 
        <div className='font-bold  tracking-tight text-[18px] text-black pl-1'>Facture</div>
        <div className='font-medium  tracking-tight text-[14px] text-green-400 pl-1'>N° 123 </div>
      </div> 
      <div className='flex flex-col w-full'>
        <div className='ml-2'>
        <div className='text-md font-medium text-gray-500 flex flex-row'><FaUserTie size={20} color="gray" />kou jean paul</div>
        </div>
        <div className='ml-2 flex flex-col justify-center'>
            <div className='font-bold  tracking-wide text-md text-black '>100000 FCFA</div>
            <div className='font-medium text-start tracking-tight text-[11px] text-red-400 '>Montant impayé </div>
        </div>

      </div>
            <div className='ml-2 font-bold  tracking-tight text-xs text-black '>Periode: <span className='text-gray-400'> janvier 2025  </span></div>
          </div>
  )
}
