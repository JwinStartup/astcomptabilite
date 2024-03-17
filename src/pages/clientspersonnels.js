import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Entete from '../components/entete'

export default function ClientsPersonnels() {
  const navigate= useNavigate() 
  return (
    <div>
        <Entete />
       <button className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={()=>navigate("/")} > retour</button>
      <div className='w-full flex justify-center items-center mt-20 gap-4'>

        <Link to='/cp/ListeParent' className="w-52 h-52 tracking-tight  text-black font-semibold bg-slate-200 rounded-3xl text-center items-center flex justify-center shadow-lg cursor-pointer">
          Parents & Eleves 
        </Link>
        <Link to='/cp/ListePersonnel' className="w-52 h-52 tracking-tight  text-black font-semibold bg-red-100 rounded-3xl text-center items-center flex justify-center">
          Personnels
        </Link>
      </div>
    </div>
  )
}
