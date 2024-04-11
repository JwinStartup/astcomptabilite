import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import  {useNavigate} from "react-router-dom"
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Backdrop from '../components/backdrop.js'
import VoirCharge from '../components/voirCharge.js'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite.js'
import { RingLoader } from 'react-spinners'
import { FaPlusCircle } from "react-icons/fa"
export default function Charges() {
  const navigate=useNavigate()
  const dispatch =useDispatch()
  const [rub , setRub]=useState({nom:'',bol:false,value:null})
  useEffect(() => { 
    dispatch(comptabiliteActions.listeCharge())
  },[rub])
  
  const {isLoader,charges} = useSelector((state)=>{
    return state.comptabiliteReducer
   },[parama]);
 
  return (
    <div>
        <Entete />
     <div className='  flex justify-between items-center space-x-2 mx-4'>
     <div className="flex  items-center "  onClick={()=>navigate('/')} >
        <IoIosArrowDropleftCircle size={30} color="black" />
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900  ">Charges  </h5>
     </div>
          <div classNamme='flex items-center flex-col justify-center '>
                <select className='text-sm font-medium'>
                    <option value="">Aujourd'hui</option>
                    <option value="">Ce mois</option>
                    <option value="">Tous les mois</option>
                </select>
             </div>
                 <FaPlusCircle color="gray" size={25}  onClick={()=>navigate('/creerCharge')}/>
            </div>
  

            {isLoader===true?<div className="flex flex-col gap-2 justify-center items-center ">
            { [1,2,3].map((i,j)=><div key={j} className="animate-pulse flex space-x-4 border rounded-md w-[250px] h-[200px] px-2 bg-gray-100">
            </div>)}
            </div>:
         <> {charges.length===0?<p className='text-center w-full'>Pas de Charges enregistrés </p>:
            <div className='w-full flex justify-center mt-3 flex-col items-center  '>
                {charges.map((value,index)=>
                  <VoirCharge 
                             parama={parama}
                      value={value}
                       />)}
            </div>}</>}
    
    </div>
  )
}
