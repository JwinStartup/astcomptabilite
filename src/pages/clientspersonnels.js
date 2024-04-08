import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Entete from '../components/entete'
import ParentListe from '../components/parentListe'
import PersonnelListe from '../components/personnelListe'
import EleveListe from '../components/eleveListe'
import { IoIosArrowDropleftCircle } from "react-icons/io";

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




export default function ClientsPersonnels() {
  const navigate= useNavigate() 
  const [switchChange,setSwitchChange]=useState("PARENT")
  return (
    <div>
        <Entete />
        <div className='  flex  py-2 border-b justify-center items-center '>
         <div>
          <IoIosArrowDropleftCircle size={30} color="black" onClick={()=>navigate('/')} />
         </div>
         <div className='w-[400px] flex  justify-center items-center  '>
           <Link  onClick={()=>setSwitchChange('PARENT')} className={`tracking-wider w-full text-center items-center  px-4 flex justify-center  cursor-pointer  ${switchChange==="PARENT"?'font-bold text-green-500 border-green-500 ':'font-semibold text-black  '}`} >
          Parents 
        </Link>
        <Link onClick={()=>setSwitchChange('PERSONNEL')}  className={`tracking-wider w-full text-center items-center  px-4 flex justify-center  cursor-pointer  ${switchChange==="PERSONNEL"?'font-bold text-green-500 border-green-500 ':'font-semibold text-black  '}`}>
          Personnels
        </Link>
        <Link onClick={()=>setSwitchChange('ELEVE')}  className={`tracking-wider w-full text-center items-center  px-4 flex justify-center  cursor-pointer  ${switchChange==="ELEVE"?'font-bold text-green-500 border-green-500 ':'font-semibold text-black  '}`}>
           Eleves 
        </Link>
      </div>
        <div>
        <FaPlusCircle color="gray" size={25}  />
       </div>
    </div>
  <SetComponent p={switchChange}/>
</div>
  )
}
