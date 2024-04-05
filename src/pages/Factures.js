import React from 'react'
import Entete from '../components/entete'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5"
export default function Factures() {
  const navigate=useNavigate()
  return (
    <div className='w-full'>
    <Entete />
    <div className='flex items-center justify-start mx-2 cursor-pointer' onClick={()=>navigate("/")}>
    <IoArrowBackCircleSharp  color='red' size={40}  />
    <p className='font-bold rounded-lg text-xl '> Factures & Reçues </p>
            </div>
  <div className='w-full flex justify-center items-center mt-8 ml-3 mr-2 '>
  {/* <Link to='/factures/commissions' className="w-52 h-52 tracking-tight  text-black font-semibold bg-slate-200 rounded-3xl text-center items-center flex justify-center shadow-lg cursor-pointer">
      Commissions
    </Link>
    <Link to='/factures/impayes' className="w-52 h-52 tracking-tight  text-black font-semibold bg-red-100 rounded-3xl text-center items-center flex justify-center">
      Factures 
    </Link>
    <Link to='/factures/recues' className="w-52 h-52 tracking-tight  text-black font-semibold bg-red-100 rounded-3xl text-center items-center flex justify-center">
      Reçues
    </Link>*/}
      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between mb-2 w-full'>
       <p className='text-lg font-bold text-gray-400'>
        Factures recentes
      </p>
       <Link to='/factures/impayes' className=' cursor-pointer bg-red-200 p-2 rounded-md mr-5 text-xs font-bold text-red-400'>
        Voir plus
      </Link>
      </div>
         {/* les 3 premieres factures crées  ou modifiés*/}
        <div className='border rounded-md '>
           <div className='flex flex-row justify-between w-full'> 
        <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Facture</div>
        <div className='font-medium  tracking-tight text-[14px] text-green-400 pl-1'>N° 123 </div>
      </div> 
      <div className='flex flex-row w-full  justify-between my-4'>
        <div className='ml-7'>
        <div className='text-lg font-medium text-gray-500'>{value.client.nom} {value.client.prenoms}</div>
        </div>
        <div>
             <div className='font-bold  tracking-wide text-[22px] text-black '>{value.montant} FCFA</div>
            <div className='font-medium text-center tracking-tight text-[11px] text-red-400 '>Montant impayé </div>
        </div>

      </div>
            <div className='mx-7 font-bold  tracking-tight text-xs text-black '>facture du mois de  <span className='text-gray-400'> janvier 2025  </span></div>
          </div>
       
      </div>
    
     </div>
  </div>
  )
}
