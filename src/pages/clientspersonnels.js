import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Entete from '../components/entete'
import ParentListe from '../components/parentListe'
import PersonnelListe from '../components/personnelListe'
import EleveListe from '../components/eleveListe'
import VoirParent from '../components/voirParent'
import SupprimerParent from '../components/suppParent'
import ModifierParent from '../components/modifierParent'
import VoirPersonnel from '../components/voirPersonnel'
import CreerParent from '../components/creerParent'
import CreerEleve from '../components/creerEleve'
import CreerPersonnel from '../components/creerPersonnel'
import SupprimerPersonnel from '../components/suppPersonnel'
import ModifierPersonnel from '../components/modifierPersonnel'
import VoirEleve from '../components/voirEleve'
import SupprimerEleve from '../components/suppEleve'
import ModifierEleve from '../components/modifierEleve'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import Backdrop from '../components/backdrop'
const SetComponent=({p,voir,voirPer,voirEl})=>{
  console.log(p)
  switch (p) {
     case 'PARENT':
      return(
        <div>
        <ParentListe  voir={voir} />
        </div>
      )
     case 'PERSONNEL':
      return(
        <div>
        <PersonnelListe voirPer={voirPer} />
        </div>
      )
   
    case 'ELEVE':
      return(
        <div>
        <EleveListe voirEl={voirEl} />
        </div>
      )
  
    default:
      break;
  }
}



const SetComponentPEP=({p,retour,value,supprimer,supprimerPer,supprimerEl})=>{
  console.log(p)
  switch (p) {
    case 'CREER':
      return(
        <div>
          <Backdrop/>
        <CreerPersonnel retour={retour} />
        </div>
      )
    case 'MODIFIERPERSONNEL':
      return(
        <div>
          <Backdrop/>
        <ModifierPersonnel retour={retour} value={value}/>
        </div>
      )
    case 'VOIRPERSONNEL':
      return(
        <div>
          <Backdrop/>
        <VoirPersonnel retour={retour} value={value} supprimerPer={supprimerPer}/>
        </div>
      )
    case 'SUPPRIMERPERSONNEL':
      return(
        <div>
          <Backdrop/>
        <SupprimerPersonnel retour={retour} value={value} />
        </div>
      )
    case 'CREERPARENT':
      return(
        <div>
          <Backdrop/>
        <CreerParent retour={retour} value={value}/>
        </div>
      )
    case 'MODIFIERPARENT':
      return(
        <div>
          <Backdrop/>
        <ModifierParent retour={retour} value={value}/>
        </div>
      )
    case 'VOIRPARENT':
      return(
        <div>
          <Backdrop/>
        <VoirParent retour={retour} value={value} supprimer={supprimer}/>
        </div>
      )
    case 'SUPPRIMERPARENT':
      return(
        <div>
          <Backdrop/>
        <SupprimerParent retour={retour} value={value}/>
        </div>
      )
    case 'CREERELEVE':
      return(
        <div>
          <Backdrop/>
        <CreerEleve retour={retour} value={value}/>
        </div>
      )
    case 'MODIFIERELEVE':
      return(
        <div>
          <Backdrop/>
        <ModifierEleve retour={retour} value={value}/>
        </div>
      )
    case 'VOIRELEVE':
      return(
        <div>
          <Backdrop/>
        <VoirEleve retour={retour} value={value} supprimerEl={supprimerEl}/>
        </div>
      )
    case 'SUPPRIMERELEVE':
      return(
        <div>
          <Backdrop/>
        <SupprimerEleve retour={retour} value={value} />
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

  const changeCreer=(p)=>{
    if(p==='PARENT'){
      setRub({bol:true,nom:'CREERPARENT',value:null})
    }else if(p==='PERSONNEL'){
      setRub({bol:true,nom:'CREERPERSONNEL',value:null})
    }else{
      setRub({bol:true,nom:'CREERELEVE',value:null})
    }
  }
  const voir=(i)=>{
    setRub({bol:true,nom:'VOIRPARENT',value:i})
  }
  const voirEl=(i)=>{
    setRub({bol:true,nom:'VOIRELEVE',value:i})
  }
  const voirPer=(i)=>{
    setRub({bol:true,nom:'VOIRPERSONNEL',value:i})
  }
  const supprimer=(i)=>{
    setRub({bol:true,nom:'SUPPRIMERPARENT',value:i})
  }
  const supprimerEl=(i)=>{
    setRub({bol:true,nom:'SUPPRIMERELEVE',value:i})
  }
  const supprimerPer=(i)=>{
    setRub({bol:true,nom:'SUPPRIMERPERSONNEL',value:i})
  }
  return (
    <div>
        {rub.bol!==false&&<SetComponentPEP
        p={rub.nom} retour={()=>setRub({bol:false,nom:'',value:null})} value={rub.value} 
                supprimer={supprimer}
               supprimerPer={supprimerPer}
              supprimerEl={supprimerEl}
       />}
        <Entete />
        <div className='  flex  py-2 border-b justify-center items-center '>
         <div>
          <IoIosArrowDropleftCircle size={30} color="black" onClick={()=>navigate('/')} />
         </div>
         <div className='w-[400px] flex  justify-center items-center  '>
           <Link  onClick={()=>setSwitchChange('PARENT')} className={`tracking-wider text-lg border-r w-full text-center items-center  px-4 flex justify-center  cursor-pointer  ${switchChange==="PARENT"?'font-bold text-green-500  ':'font-semibold text-black  '}`} >
          Parents 
        </Link>
        <Link onClick={()=>setSwitchChange('PERSONNEL')}  className={`tracking-wider text-lg border-r w-full text-center items-center  px-4 flex justify-center  cursor-pointer  ${switchChange==="PERSONNEL"?'font-bold text-green-500  ':'font-semibold text-black  '}`}>
          Personnels
        </Link>
        <Link onClick={()=>setSwitchChange('ELEVE')}  className={`tracking-wider text-lg  w-full text-center items-center  px-4 flex justify-center  cursor-pointer  ${switchChange==="ELEVE"?'font-bold text-green-500  ':'font-semibold text-black  '}`}>
           Eleves 
        </Link>
      </div>
        <div classNname='pr-4'>
        <FaPlusCircle color="gray" size={25} onClick={()=>setRub({bol:true,nom:'CREER',value:null})}  />
       </div>
    </div>
  <SetComponent 
             p={switchChange} 
               voir={voir}
               voirPer={voirPer}
              voirEl={voirEl}
               
             />
</div>
  )
}
