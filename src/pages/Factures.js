import React from 'react'
import Entete from '../components/entete'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5"
export default function Factures() {
  const navigate=useNavigate()
  return (
    <div>
    <Entete />
    <div className='flex items-cennter justify-start mx-2 '>
    <IoArrowBackCircleSharp  color='red' size={32} onClick={()=>navigate("/")} />
    <p className='font-bold rounded-lg text-xl '> Factures & Reçues </p>
            </div>
  <div className='w-full flex justify-center items-center mt-2 '>
  {/* <Link to='/factures/commissions' className="w-52 h-52 tracking-tight  text-black font-semibold bg-slate-200 rounded-3xl text-center items-center flex justify-center shadow-lg cursor-pointer">
      Commissions
    </Link>
    <Link to='/factures/impayes' className="w-52 h-52 tracking-tight  text-black font-semibold bg-red-100 rounded-3xl text-center items-center flex justify-center">
      Factures 
    </Link>
    <Link to='/factures/recues' className="w-52 h-52 tracking-tight  text-black font-semibold bg-red-100 rounded-3xl text-center items-center flex justify-center">
      Reçues
    </Link>*/}
      <div className='flex flex-col '>
        <div className='flex items-center justify-between mb-2 w-full'>
       <p className='text-lg font-bold text-gray-400'>
        Factures recentes
      </p>
       <Link to='/factures/impayes' className='text-xs font-bold text-red-400'>
        Voir plus
      </Link>
      </div>
         {/* les 3 premieres factures crées  ou modifiés*/}
        <div>
          
          </div>
       
      </div>
    
     </div>
  </div>
  )
}
