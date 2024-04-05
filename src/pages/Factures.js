import React from 'react'
import Entete from '../components/entete'
import FactureComponent from '../components/factureCompo'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5"
import { FaUserTie } from "react-icons/fa6"
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
      <div className="flex flex-row gap-2 overflow-x-auto w-full" >
          <FactureComponent/>
          <FactureComponent/>
          <FactureComponent/>
        </div>
       
      </div>
    
     </div>
         {/* les 3 premieres factures crées  ou modifiés*/}
   <div className='w-full flex justify-center items-center mt-8 ml-3 mr-2 '>
 
      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between mb-2 w-full'>
       <p className='text-lg font-bold text-gray-400'>
        Reçues recentes
      </p>
       <Link to='/factures/impayes' className=' cursor-pointer bg-red-200 p-2 rounded-md mr-5 text-xs font-bold text-red-400'>
        Voir plus
      </Link>
      </div>
         {/* les 3 premieres factures crées  ou modifiés*/}
      <div className="flex flex-row gap-2 overflow-x-auto w-full" >
          <FactureComponent/>
          <FactureComponent/>
          <FactureComponent/>
        </div>
       
      </div>
    
     </div>
  </div>
  )
}
