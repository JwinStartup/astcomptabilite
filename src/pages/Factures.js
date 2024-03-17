import React from 'react'
import Entete from '../components/entete'
import { Link, useNavigate } from 'react-router-dom'

export default function Factures() {
  const navigate=useNavigate()
  return (
    <div>
    <Entete />
    <div className='flex items-cennter justify-between mx-5 w-[1150px]'>
    <button className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={()=>navigate("/")} > retour</button>
            </div>
  <div className='w-full flex justify-center items-center mt-20 gap-4'>
    <Link to='/factures/commissions' className="w-52 h-52 tracking-tight  text-black font-semibold bg-slate-200 rounded-3xl text-center items-center flex justify-center shadow-lg cursor-pointer">
      Commissions
    </Link>
    <Link to='/factures/impayes' className="w-52 h-52 tracking-tight  text-black font-semibold bg-red-100 rounded-3xl text-center items-center flex justify-center">
      Factures 
    </Link>
    <Link to='/factures/recues' className="w-52 h-52 tracking-tight  text-black font-semibold bg-red-100 rounded-3xl text-center items-center flex justify-center">
      Reçues
    </Link>
    
     </div></div>
  )
}
