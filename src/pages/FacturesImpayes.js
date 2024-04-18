import React, { useEffect, useState,useMemo } from 'react'
import Entete from '../components/entete'
import Backdrop from '../components/backdrop'
import FormulaireCreerFacture from '../components/Formulaires/formulaireCreerFacture'
import VoirRecue from '../components/voirRecue.js'
import ModifierFacture from '../components/Formulaires/modifierFacture'
import FormulairePayerFacture from '../components/Formulaires/formulairePayerFacture.js'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import VoirFacture from '../components/Formulaires/voirFacture.js'
import PartagerFacture from '../components/Formulaires/partagerFacture.js'
import SupprimerFacture from '../components/Formulaires/supprimerFacture.js'
import {useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { RingLoader} from 'react-spinners';
import { comptabiliteActions } from '../reducer/comptabilite.js'
import { PropagateLoader } from 'react-spinners';
import { FaSearch,FaFileInvoice } from 'react-icons/fa';
import { FaPlusCircle } from "react-icons/fa"
import { MdOutlineArrowBackIos } from "react-icons/md";
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
    case 'PARTAGER':
      return(
        <div>
          <Backdrop/>
        <PartagerFacture retour={retour} value={value}/>
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
     case 'VOIRRECUE':
      return(
        <div>
          <Backdrop/>
        <VoirRecue retour={retour} value={value} />
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
  const navigate=useNavigate()
  const [fact , setFact]=useState(" ")
  useEffect(() => { 
    dispatch(comptabiliteActions.listeFacture())
  },[rub])
  
  const {isLoader,factures} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
  
  return (
    <div className=' w-full'>
         {rub.bol!==false&&<SetComponent p={rub.nom} retour={()=>setRub({bol:false,nom:''})} value={rub.value} />}
        <Entete />
     <div className='  w-full  flex flex-col  '>
     <div className='    flex justify-between items-center space-x-2 mx-4'>
    <div className="flex  items-center "  onClick={()=>navigate('/')} >
        <IoIosArrowDropleftCircle size={30} color="black" />
        <FaFileInvoice  size={30} color="#1D4ED8" style={{paddingRigth:"5px"}}/>
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900  ">Facture  </h5>
    </div>
  {/* <div classNamme='flex items-center flex-col justify-center '>
                <select className='text-sm font-medium'>
                    <option value="">Aujourd'hui</option>
                    <option value="">Ce mois</option>
                    <option value="">Tous les mois</option>
                </select>
             </div> */}
                 <FaPlusCircle color="gray" size={25}  onClick={()=>setRub({nom:'CREER',bol:true})}/>
            </div>
  
       {isLoader?
            <div className="flex flex-col gap-2 justify-center items-center ">
            { [1,2,3].map((i,j)=><div key={j} className="animate-pulse flex space-x-4 border rounded-md w-[250px] h-[200px] px-2 bg-gray-100">
            </div>)}
            </div>: <div >
          {factures.length===0?
         <div className='w-full flex justify-center items-center'> Pas de facture</div>
                          :<div className='flex flex-col gap-3 justify-center items-center'>
       {factures.map((value,index)=>
            <VoirFacture 
                     voirRecue={()=>setRub({nom:'VOIRRECUE',bol:true, value:value})}
                     supprimer={()=>setRub({nom:'SUPPRIMER',bol:true, value:value})} 
                     payer={()=>setRub({nom:'PAYER',bol:true, value:value} )} value={value}
                     partager={()=>setRub({nom:'PARTAGER',bol:true, value:value} )} value={value}
                     modifier={()=>setRub({nom:'MODIFIER',bol:true, value:value} )} value={value}
                />)}
                       </div>}
      </div>}

</div>
    
    </div>
  )
}
