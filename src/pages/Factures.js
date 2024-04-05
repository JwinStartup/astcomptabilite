import React, {useEffect,useState} from 'react'
import Entete from '../components/entete'
import FactureComponent from '../components/factureCompo'
import RecuesComponent from '../components/recuesCompo'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5"
import { FaUserTie } from "react-icons/fa6"
import { useDispatch,useSelector } from 'react-redux';

import { RingLoader} from 'react-spinners';
import { comptabiliteActions } from '../reducer/comptabilite.js'
export default function Factures() {
   const dispatch=useDispatch()
   useEffect(() => { 
    dispatch(comptabiliteActions.listeFacture())
    dispatch(comptabiliteActions.listeRecue())
  },[])
  const {isLoader,factures,recues} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
  const navigate=useNavigate()
   console.log(factures,recues)
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
      <div  >
         {isLoader?
            <div className="flex flex-row gap-2 overflow-x-auto w-full">
            { [1,2,3].map((i,j)=><div key={j} className="animate-pulse flex space-x-4 border rounded-md w-[170px] px-2 bg-gray-100">
            </div>)}
            </div> :<div className="flex flex-row gap-2 overflow-x-auto w-full">
                        {factures.map((i,j)=><FactureComponent facture={i} />)}
                        </div>}
         </div>
       
      </div>
    
     </div>
       
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
         {isLoader?
            <div className="flex flex-row gap-2 overflow-x-auto w-full">
            { [1,2,3].map((i,j)=><div key={j} className="animate-pulse flex space-x-4 border rounded-md w-[170px] px-2 bg-gray-100">
            </div>)}
            </div> :<div className="flex flex-row gap-2 overflow-x-auto w-full">
                        {recues.map((i,j)=><RecuesComponent recue={i} />)}
                        </div>}
        </div>
       
      </div>
    
     </div>
         
           <span className='text-xs mt-6 text-gray-400 w-full justify-center '>
           (c) 2024 Astraining  by jwin technology
        </span>
  </div>
  )
}
