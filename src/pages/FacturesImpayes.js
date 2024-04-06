import React, { useEffect, useState,useMemo } from 'react'
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
import { FaSearch,FaFileInvoice } from 'react-icons/fa';
import { FaPlusCircle } from "react-icons/fa"
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
  const [fact , setFact]=useState(" ")
  useEffect(() => { 
    dispatch(comptabiliteActions.listeFacture())
  },[rub])
  
  const {isLoader,factures} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
  const navigate=useNavigate()
/*  const facturesArray = useMemo(() => 
        { 
          if(fact!==" "){
          return factures.filter((u)=>u._id.match(fact))
        }else{
          return  factures.filter((u)=>u)
        }
        }
    ,[fact])*/
  
  return (
    <div>
         {rub.bol!==false&&<SetComponent p={rub.nom} retour={()=>setRub({bol:false,nom:''})} value={rub.value} />}
        <Entete />
     <div className='  flex justify-between  space-x-2 mx-4'>
     <div className=' mb-3 p-0  tracking-tight text-[22px] text-black font-semibold '>
     <div className='  flex justify-between  space-x-2'>
    <div className="flex items-center mb-3">
        <FaFileInvoice  size={30} color="#1D4ED8"/>
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900 ">Facture  </h5>
    </div>
                <select className='text-sm font-medium'>
                    <option value="">Aujourd'hui</option>
                    <option value="">Ce mois</option>
                    <option value="">Tous les mois</option>
                </select>
                 <FaPlusCircle color="gray" size={30}  onClick={()=>setRub({nom:'CREER',bol:true})}/>
            </div>
            </div>
        <div className='flex flex-col gap-3 w-full justify-center items-center'>
       {factures.map((value,index)=><VoirFacture retour={()=>setRub({nom:'',bol:false,value:null})} value={value}/>)}
      </div>
  {/*factures.map((value,index)=><tr key={index} className=' odd:bg-gray-100  bg-white rounded-3xl h-14 m-2  items-center w-full hover:bg-green-100 cursor-pointer'>
      <td className='font-medium text-base text-gray-500 text-center'>{value._id.slice(value._id.length-6)}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.client.nom} {value.client.prenoms}</td>      
      <td className='font-medium text-base text-gray-500 text-center'>{value.periodeAjouter}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.montant}</td>
        <td className= {`font-medium text-base text-center ${value.type==='impaye'?'text-red-500':'text-green-500'}  `}>{value.type}</td>
        {value.type==='impaye'&&<td className='font-medium text-base text-gray-500 text-center ' onClick={()=>setRub({nom:'PAYER',bol:true, value:value} )}>Payer </td>}
         <td className='font-medium text-base text-gray-500 text-center ' onClick={()=>setRub({nom:'VOIR',bol:true,value:value} )}>Voir </td>
         {value.type==='impaye'&& <td className='font-medium text-base text-gray-500 text-center 'onClick={()=>setRub({nom:'MODIFIER',bol:true,value:value} )}>Modifier </td>}
           {value.type==='impaye'&& <td className='font-medium text-base text-gray-500 text-center 'onClick={()=>setRub({nom:'SUPPRIMER',bol:true,value:value} )}>Supprimer </td>}
    </tr>)*/}
</div>
    
    </div>
  )
}
