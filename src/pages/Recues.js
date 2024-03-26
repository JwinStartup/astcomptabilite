import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import {useNavigate} from 'react-router-dom'
import Backdrop from '../components/backdrop'
import VoirRecue from '../components/voirRecue.js'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite.js'
import { RingLoader } from 'react-spinners'
export default function Recues() {
 const dispatch = useDispatch()
  const navigate=useNavigate()
 const [rub , setRub]=useState({nom:'',bol:false,value:null})
  useEffect(() => { 
    dispatch(comptabiliteActions.listeRecue())
  },[])
  
  const {isLoader,recues} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
  return (
    <div>
      {console.log(recues)}
        {rub.bol!==false&&<div>
          <Backdrop/>
        <VoirRecue retour={()=>setRub({bol:false})} value={rub.value}/>
        </div>}
         <Entete />
         <div>
            <div className='flex items-cennter justify-between mx-5 w-[1150px]'>
            <div className=' mb-3 p-0  tracking-tight text-[22px] text-black font-semibold '><button className=' bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-2' onClick={()=>navigate("/factures")} > retour</button>Reçues </div>
                <div className='  flex justify-between  space-x-2'>
                  <input type="search" className='w-[500px] bg-slate-400 rounded-3xl  pl-1 placeholder-white' placeholder='Numero de reçue' />
                <select name="" id="">
                    <option value="">Aujourd'hui</option>
                    <option value="">Ce mois</option>
                    <option value="">Tous les mois</option>
                </select>
            </div>
            </div>
            {isLoader===true?<RingLoader
        color={"green"}
        size={60}
      />:
  <> {recues.length===0?<p className='text-center w-full'>Pas de reçues </p>:



            <div className='w-full flex justify-center mt-16 '>

            <table className="w-full mx-2">
  <thead>
    <tr className="">
      <th  className='border-b-2 text-gray-400'>Numeros</th>
      <th  className='border-b-2 text-gray-400'>Clients</th>
      <th  className='border-b-2 text-gray-400'>Facture</th>
      <th  className='border-b-2 text-gray-400'>Periode</th>
     <th  className='border-b-2 text-gray-400'>Montants</th>
     <th  className='border-b-2 text-gray-400'>Mode paiement</th>
     <th  className='border-b-2 text-gray-400'>Ref paiement</th>
    </tr>
  </thead>
  <tbody>
  {recues.map((value,index)=><tr key={index} className=' odd:bg-gray-100  bg-white rounded-3xl h-14 m-2  items-center w-full hover:bg-green-100 cursor-pointer'>
      <td className='font-medium text-base text-gray-500 text-center'>{value._id.slice(value._id.length-6)}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.client.nom} {value.client.prenoms}</td>      
      <td className='font-medium text-base text-gray-500 text-center'>{value.facture._id.slice(value.facture._id.length-6)}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.periodeAjouter}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.montant}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.modePaiement}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.refPaiement}</td>
         <td className='font-medium text-base text-gray-500 text-center ' onClick={()=>setRub({nom:'VOIR',bol:true,value:value} )}>Voir </td>
         <td className='font-medium text-base text-gray-500 text-center ' >Telecharger </td>
    </tr>)}
  </tbody>
</table>
</div>
}
</>
}
         </div>
    </div>
  )
}
