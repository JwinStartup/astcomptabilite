import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import Backdrop from '../components/backdrop'
import FormulaireCreerFacture from '../components/Formulaires/formulaireCreerFacture'
import ModifierFacture from '../components/Formulaires/modifierFacture'
import FormulairePayerFacture from '../components/Formulaires/formulairePayerFacture.js'
import VoirFacture from '../components/Formulaires/voirFacture.js'
import SupprimerFacture from '../components/Formulaires/supprimerFacture.js'
import {useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { RingLoader} from 'react-spinners';
import { comptabiliteActions } from '../reducer/comptabilite.js'
import { PropagateLoader } from 'react-spinners';
import { FaSearch } from 'react-icons/fa';
const SetComponent=({p,retour,value})=>{
  console.log(p)
  switch (p) {
    case 'CREER':
      return(
        <div>
          <Backdrop/>
        <FormulaireCreerFacture retour={retour}  />
        </div>
      );
    case 'VOIR':
      return(
        <div>
          <Backdrop/>
        <VoirFacture retour={retour} value={value}/>
        </div>
      )
    case 'SUPPRIMER':
      return(
        <div>
          <Backdrop/>
        <SupprimerFacture retour={retour} value={value} />
        </div>
      )
     case 'MODIFIER':
      return(
        <div>
          <Backdrop/>
        <ModifierFacture retour={retour} value={value} />
        </div>
      )
    case 'PAYER':
      return(
        <div>
          <Backdrop/>
        <FormulairePayerFacture retour={retour} value={value} />
        </div>
      )
  
  
    default:
      break;
  }
}
export default function FacturesImpayes() {
  const dispatch =useDispatch()
  const [rub , setRub]=useState({nom:'',bol:false,value:null})
  useEffect(() => { 
    dispatch(comptabiliteActions.listeFacture())
  },[rub])
  
  const {isLoader,factures} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
  const navigate=useNavigate()
  return (
    <div>
         {rub.bol!==false&&<SetComponent p={rub.nom} retour={()=>setRub({bol:false,nom:''})} value={rub.value} />}
        <Entete />
     <div className='  flex justify-between  space-x-2 mx-4'>
     <div className=' mb-3 p-0  tracking-tight text-[22px] text-black font-semibold '><button className=' bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-2' onClick={()=>navigate("/factures")} > retour</button>Factures </div>
     <div className='  flex justify-between  space-x-2'>
                  <div className=' border rounded-full justify-start items-center flex my-3 p-1 w-[400px]'>
                   <FaSearch size={20} color='black' />
                    <input onChange={(e)=>dispatch(comptabiliteActions.recherche(e.target.value))} type='search' placeholder='Numero ...' className='py-2 bg-transparent ml-3 outline-none placeholder:font-medium   '/>
                  </div>
                <select name="" id="">
                    <option value="">Aujourd'hui</option>
                    <option value="">Ce mois</option>
                    <option value="">Tous les mois</option>
                </select>
                <button onClick={()=>setRub({nom:'CREER',bol:true})} className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>+ Creer une facture</button>
            </div>
            </div>
            {isLoader===true?<RingLoader
        color={"green"}
        size={60}
      />:
  <> {factures.length===0?<p className='text-center w-full'>Pas de facture </p>:
            <div className='w-full flex justify-center mt-16 '>

            <table className="w-full mx-2">
  <thead>
    <tr className="">
      <th  className='border-b-2 text-gray-400'>Numeros</th>
      <th  className='border-b-2 text-gray-400'>Clients</th>
      <th  className='border-b-2 text-gray-400'>Periode</th>
     <th  className='border-b-2 text-gray-400'>Montants</th>
     <th  className='border-b-2 text-gray-400'>type</th>
    </tr>
  </thead>
  <tbody>
  {factures.map((value,index)=><tr key={index} className=' odd:bg-gray-100  bg-white rounded-3xl h-14 m-2  items-center w-full hover:bg-green-100 cursor-pointer'>
      <td className='font-medium text-base text-gray-500 text-center'>{value._id.slice(value._id.length-6)}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.client.nom} {value.client.prenoms}</td>      
      <td className='font-medium text-base text-gray-500 text-center'>{value.periodeAjouter}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.montant}</td>
        <td className= {`font-medium text-base text-center ${value.type==='impaye'?'text-red-500':'text-green-500'}  `}>{value.type}</td>
        {value.type==='impaye'&&<td className='font-medium text-base text-gray-500 text-center ' onClick={()=>setRub({nom:'PAYER',bol:true, value:value} )}>Payer </td>}
         <td className='font-medium text-base text-gray-500 text-center ' onClick={()=>setRub({nom:'VOIR',bol:true,value:value} )}>Voir </td>
         {value.type==='impaye'&& <td className='font-medium text-base text-gray-500 text-center 'onClick={()=>setRub({nom:'MODIFIER',bol:true,value:value} )}>Modifier </td>}
           {value.type==='impaye'&& <td className='font-medium text-base text-gray-500 text-center 'onClick={()=>setRub({nom:'SUPPRIMER',bol:true,value:value} )}>Supprimer </td>}
    </tr>)}
  </tbody>
</table>
</div>
}
</>
}
    
    </div>
  )
}
