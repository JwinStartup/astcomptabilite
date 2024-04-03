import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import  {useNavigate} from "react-router-dom"
import AjouterCharges from "../components/ajouterCharges.js"
import ModifierCharge from "../components/modifierCharge.js"
import SupprimerCharge from "../components/supprimerCharge.js"
import Backdrop from '../components/backdrop.js'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite.js'
import { RingLoader } from 'react-spinners'
export default function Charges() {
  const navigate=useNavigate()
  const dispatch =useDispatch()
  const [rub , setRub]=useState({nom:'',bol:false,value:null})
  useEffect(() => { 
    dispatch(comptabiliteActions.listeCharge())
  },[rub])
  
  const {isLoader,charges} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
  const SetComponent=({p,retour,value})=>{
  switch (p) {
    case 'AJOUTER':
      return(
        <div>
          <Backdrop/>
        <AjouterCharges retour={()=>setRub(false)} />
        </div>
      )
    case 'SUPPRIMER':
      return(
        <div>
          <Backdrop/>
        <SupprimerCharge retour={retour} value={value} />
        </div>
      )
     case 'MODIFIER':
      return(
        <div>
          <Backdrop/>
        <ModifierCharge retour={retour} value={value} />
        </div>
      )
    default:
      break;
  }
}
  return (
    <div>
    {rub.bol!==false&&<SetComponent p={rub.nom} retour={()=>setRub({bol:false,nom:''})} value={rub.value} />}
        <Entete />
     <div className='  flex justify-between  space-x-2 mx-4'>
     <div className=' mb-3 p-0 text-[22px] tracking-tight  text-black font-semibold '> <button className=' bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-2' onClick={()=>navigate("/")} > retour</button>Les charges </div>
     <div className='  flex justify-between  space-x-2'>
                <select name="" id="">
                    <option value="">Aujourd'hui</option>
                    <option value="">Ce mois</option>
                    <option value="">Tous les mois</option>
                </select>
            </div>
            <button className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={()=>setRub({bol:true,nom:'AJOUTER',value:value})}>+ Ajouter Charges</button>

            </div>

            {isLoader===true?<RingLoader
        color={"green"}
        size={60}
      />:
  <> {charges.length===0?<p className='text-center w-full'>Pas de Charges enregistrés </p>:

            <div className='w-full flex justify-center mt-3 flex-col items-center  '>
                
                {charges.map((value,index)=><div key={index} className='flex flex-row w-[800px] justify-between items-center bg-white border rounded-xl shadow mx-8  my-2 p-4'>
                <div className='space-y-2'>
                {value.nomCharge&& <div className='text-xl font-medium text-gray-500'>nom de la charge:  {value.nomCharge} </div>}
                <div className='text-md font-medium text-gray-500'>type:  {value.type} </div>
                {value.type==="salaire"&&<div className='text-md font-medium text-gray-500'>salaire de  {value.personnel} </div>}
                <div className='text-sm w-[600px] h-11 font-medium text-gray-500'>{value.observation} </div>
                <div className='font-bold  tracking-tight text-sm text-black '>periode:{value.periodeAjouter} </div>

                </div>
                <div>
                    <div className='font-bold  tracking-wide text-[22px] text-red-600 '>{value.montant}</div>
                    <div className='font-medium text-center tracking-tight text-[11px] text-gray-300 '>il y a 2 semaines</div>
                   <div className='mb-3 p-0 text-[22px] tracking-tight  text-black font-semibold'>
                  <button className=' bg-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-2' onClick={()=>setRub({bol:true,nom:'MODIFIER',value:value})} > Modifier</button>
                  <button className=' bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-2' onClick={()=>setRub({bol:true,nom:'SUPPRIMER',value:value})} > Supprimer</button>
                  </div>
                </div>

                </div>)}
       
            </div>}</>}
    
    </div>
  )
}
