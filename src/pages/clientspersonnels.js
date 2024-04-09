import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Entete from '../components/entete'
import ParentListe from '../components/parentListe'
import PersonnelListe from '../components/personnelListe'
import EleveListe from '../components/eleveListe'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import Backdrop from '../components/backdrop'
const SetComponent=({p})=>{
  console.log(p)
  switch (p) {
     case 'PARENT':
      return(
        <div>
        <ParentListe   />
        </div>
      )
     case 'PERSONNEL':
      return(
        <div>
        <PersonnelListe  />
        </div>
      )
    case 'ELEVE':
      return(
        <div>
        <EleveListe  />
        </div>
      )
  
    default:
      case 'PARENT':
      return(
        <div>
        <ParentListe   />
        </div>
      )
      break;
  }
}



const SetComponentPEP=({p,retour,value})=>{
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


export default function ClientsPersonnels() {
  const navigate= useNavigate() 
  const [rub , setRub]=useState({nom:'',bol:false,value:null})
  const [switchChange,setSwitchChange]=useState("PARENT")
  return (
    <div>
        {rub.bol!==false&&<SetComponentPEP p={rub.nom} retour={()=>setRub({bol:false,nom:'',value:null})} value={rub.value} />}
        <Entete />
        <div className='  flex  py-2 border-b justify-center items-center '>
         <div>
          <IoIosArrowDropleftCircle size={30} color="black" onClick={()=>navigate('/')} />
         </div>
         <div className='w-[400px] flex  justify-center items-center  '>
           <Link  onClick={()=>setSwitchChange('PARENT')} className={`tracking-wider border-r w-full text-center items-center  px-4 flex justify-center  cursor-pointer  ${switchChange==="PARENT"?'font-bold text-green-500  ':'font-semibold text-black  '}`} >
          Parents 
        </Link>
        <Link onClick={()=>setSwitchChange('PERSONNEL')}  className={`tracking-wider border-r w-full text-center items-center  px-4 flex justify-center  cursor-pointer  ${switchChange==="PERSONNEL"?'font-bold text-green-500  ':'font-semibold text-black  '}`}>
          Personnels
        </Link>
        <Link onClick={()=>setSwitchChange('ELEVE')}  className={`tracking-wider  w-full text-center items-center  px-4 flex justify-center  cursor-pointer  ${switchChange==="ELEVE"?'font-bold text-green-500  ':'font-semibold text-black  '}`}>
           Eleves 
        </Link>
      </div>
        <div classNname='pr-4'>
        <FaPlusCircle color="gray" size={25}  />
       </div>
    </div>
  <SetComponent p={switchChange}/>
</div>
  )
}
