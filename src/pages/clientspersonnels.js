import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Entete from '../components/entete'

export default function ClientsPersonnels() {
  const navigate= useNavigate() 
  return (
    <div>
        <Entete />
       <button className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={()=>navigate("/")} > retour</button>
      <div className='w-[400px] flex border-b mx-2 py-2 justify-center items-center mt-5'>
           <Link to='/cp/ListeParent' className="tracking-tight w-full text-black font-semibold   text-center items-center border-r px-4 flex justify-center  cursor-pointer">
          Parents 
        </Link>
        <Link to='/cp/ListePersonnel' className="tracking-tight w-full text-black font-semibold   text-center items-center border-r px-4 flex justify-center  cursor-pointer">
          Personnels
        </Link>
        <Link to='/cp/ListeEnfant' className="tracking-tight w-full text-black font-semibold   text-center items-center border-r px-4 flex justify-center  cursor-pointer">
           Eleves 
        </Link>
      </div>
    </div>
  )
}
