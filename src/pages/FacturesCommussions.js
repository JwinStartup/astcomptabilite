import React, { useEffect } from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite'
import { RingLoader } from 'react-spinners'

export default function FacturesCommussions() {
    const navigate=useNavigate()
    const dispatch =useDispatch()
    useEffect(() => { 
      dispatch(comptabiliteActions.listeCommission())
    },[])
    
    const {isLoader,commissions} = useSelector((state)=>{
      return state.comptabiliteReducer
     });
  return (
    <div>
         {console.log(commissions)} 

        <Entete />
     <div className='  flex justify-between  space-x-2 mx-4'>
     <div className=' mb-3 p-0  tracking-tight text-[22px] text-black font-semibold '> <button className=' bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-2' onClick={()=>navigate("/factures")} > retour</button>Les commissions </div>
     <div className='  flex justify-between  space-x-2'>
                  <input type="search" className='w-[500px] bg-slate-400 rounded-3xl  pl-1 placeholder-white' placeholder='Numero de facture' />
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
  <> {commissions.length===0?<p className='text-center w-full'>Pas de Commission </p>:

            <div className='w-full flex justify-center mt-3 flex-col items-center  '>
              {commissions.map((value,index)=>  <div  key={index} className='flex flex-row w-[800px] justify-between items-center bg-white border rounded-xl shadow mx-8  my-2  p-4'>
                <div className='space-y-2'>
                <div className='text-sm font-medium text-gray-500'>Reçue N* {value.recue._id} </div>
                <div className='text-lg font-medium text-gray-500'>{value.client.nom}{value.client.prenoms}</div>
                <div className='text-sm font-medium text-gray-500'>Cel: {value.client.cel} </div>
                <div className='font-bold  tracking-tight text-sm text-black '>Periode : {value.periodeAjouter} </div>

                </div>
                <div>
                    <div className='font-bold  tracking-wide text-[22px] text-black '>{value.montant} FCFA</div>
                    <div className='font-medium text-center tracking-tight text-[11px] text-red-400 '>Commission</div>
                    <div className='font-medium text-center tracking-tight text-[11px] text-gray-300 '>il y a 2 semaines</div>

                </div>

                </div>)}
                
                
                
                


       
</div>}</>}
    
    </div>
  )
}
