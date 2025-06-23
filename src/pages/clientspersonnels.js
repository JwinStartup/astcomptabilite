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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {rub.bol!==false&&<SetComponentPEP
        p={rub.nom} retour={()=>setRub({bol:false,nom:'',value:null})} value={rub.value} 
        supprimer={supprimer}
        supprimerPer={supprimerPer}
        supprimerEl={supprimerEl}
      />}
      <Entete />
      <div className='flex flex-col items-center w-full'>
        <div className='flex flex-row items-center justify-between w-full max-w-5xl py-4 px-2 bg-white/70 rounded-b-2xl shadow-md border-b mb-6'>
          <div className="flex items-center gap-2">
            <IoIosArrowDropleftCircle size={32} color="#2563eb" className="cursor-pointer hover:scale-110 transition-transform" onClick={()=>navigate('/')} />
            <span className="text-lg font-bold text-blue-800">Gestion des clients & personnels</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={()=>changeCreer(switchChange)}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors"
            >
              <FaPlusCircle size={20} /> Ajouter {switchChange === "PARENT" ? "Parent" : switchChange === "PERSONNEL" ? "Personnel" : "Élève"}
            </button>
          </div>
        </div>
        <div className='w-full max-w-5xl flex flex-row justify-center items-center gap-2 mb-4'>
          <Link
            onClick={()=>setSwitchChange('PARENT')}
            className={`tracking-wider text-base px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer border ${switchChange==="PARENT" ? 'bg-green-100 text-green-700 font-bold border-green-400 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50'}`}
          >
            Parents
          </Link>
          <Link
            onClick={()=>setSwitchChange('PERSONNEL')}
            className={`tracking-wider text-base px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer border ${switchChange==="PERSONNEL" ? 'bg-green-100 text-green-700 font-bold border-green-400 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50'}`}
          >
            Personnels
          </Link>
          <Link
            onClick={()=>setSwitchChange('ELEVE')}
            className={`tracking-wider text-base px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer border ${switchChange==="ELEVE" ? 'bg-green-100 text-green-700 font-bold border-green-400 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50'}`}
          >
            Élèves
          </Link>
        </div>
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-4 mt-2 mb-8">
          <SetComponent 
            p={switchChange} 
            voir={voir}
            voirPer={voirPer}
            voirEl={voirEl}
          />
        </div>
      </div>
      <footer className="w-full text-center text-xs text-gray-400 py-4">
        (c) 2024 Astraining by jwin technology
      </footer>
    </div>
  )
}
