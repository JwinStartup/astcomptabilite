import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import { comptabiliteActions } from '../reducer/comptabilite'
import { useDispatch, useSelector } from 'react-redux'
import { RingLoader } from 'react-spinners'
import Backdrop from '../components/backdrop'
import BilanComponent from '../components/bilanComponent'

export default function Bilan() {
  const dispatch =useDispatch()
  const [rub , setRub]=useState({retour:false,id:null})

  const navigate=useNavigate()
  useEffect(() => { 
    dispatch(comptabiliteActions.listeBilan())
  },[])
  
  const {isLoader,bilans} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
   
  return (
    <div>
         {rub.retour!==false&&<div>
        <BilanComponent retour={()=>setRub({retour:false})} id={rub.id} />
          <Backdrop/>
        </div>}
         <Entete />
         
    <button className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={()=>navigate("/")} > retour</button>

    {isLoader===true?<RingLoader
        color={"green"}
        size={60}
      />:
  <> {bilans.length===0?<p className='text-center w-full'>Pas de bilan pour le moment </p>:


    <div className='flex-row flex-wrap items-center justify-center mt-8 flex  w-full  '>
      {bilans.map((value,index)=>
         <div key={index} onClick={()=>setRub({retour:true,id:value._id})} className='w-52 h-18 m-3 p-2 cursor-pointer bg-gray-100 border rounded border-gray-200 shadow-lg flex flex-col'>
          <div className='text-lg font-bold '>
              Bilan financier
          </div>
          <div className='text-sm text-gray-400 font-medium'>
          Mois: {value.periode}
          </div>
          <div className={`${value.statut==='cloturé'?'text-red-400':'text-green-400'}
                              tracking-wide text-sm  font-medium mt-1
                              `}>
          {value.statut}
          </div>

         </div>)}
        
         
         </div>}</>}
    </div>
  )
}
