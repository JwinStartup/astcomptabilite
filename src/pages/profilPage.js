import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import Avatar from 'react-avatar'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import {useNavigate} from 'react-router-dom'
import { comptabiliteActions } from '../reducer/comptabilite'
import Backdrop from '../components/backdrop'
import BilanComponent from '../components/bilanComponent'



export default function ProfilPage() {
const dispatch = useDispatch()
 const navigate=useNavigate()
const [rub , setRub]=useState({retour:false,id:null})
 const { login,logout, user } = useContext(UserContext);
  const navigate=useNavigate()
  useEffect(() => { 
    dispatch(comptabiliteActions.listeBilan())
  },[])
  
  const {isLoader,bilans} = useSelector((state)=>{
    return state.comptabiliteReducer
   });

  return (
 <div className=' w-full'>
    <h1 className='text-2xl m-1 font-bold'>ASTComptable</h1>
   <div className="flex  items-center "  onClick={()=>navigate('/')} >
        <IoIosArrowDropleftCircle size={30} color="black" />
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900  ">Profil  </h5>
    </div>
      <div className='flex  flex-col items-center justify-center '>
            <Avatar name={`${value.nom} ${value.prenoms}`}  size="100" round={true} /> 
           <div className='flex  text-lg font-bold tracking-wider text-center w-full justify-center items-center '>
            {value.nom}  {value.prenoms}
          </div>
           <div className='flex  text-md text-green-400   font-normal tracking-widest text-center w-full justify-center items-center '>
            Parent 
          </div>
           <div className='flex  text-md font-bold tracking-wider text-center w-full justify-center items-center '>
            {value.email}  
          </div>
           <div className="flex justify-start text-red-300 font-medium text-sm items-center gap-1">{value.role} </div>
       </div>

            <div>
              <p className="text-lg font-bold ml-1 tracking-tight text-gray-900  "> Bilan financier </p>
               <div>
           
           {/*liste des bilans financiers*/}
               {isLoader?<div className='w-full flex justify-center items-center mt-10 '> 
                 <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                 </svg>
             </div>:<>
           {bilans.length===0?<p className='text-center w-full'>Pas de bilan pour le moment </p>:
    <div className='flex-row flex-wrap items-center justify-center mt-8 flex  w-full  '>
      {bilans.map((value,index)=>
         <div key={index} onClick={()=>setRub({retour:true,id:value._id})} className='w-52 h-18 m-3 p-2 cursor-pointer bg-gray-100 border rounded border-gray-200 shadow-lg flex flex-col'>
          <div className='text-lg font-bold '>
              Bilan financier
          </div>
          <div className='text-sm text-gray-400 font-medium'>
          Mois: {value.periode}
          </div>
          <div className={`${value.statut==='cloturé'?'text-red-400':'text-green-400'}
                              tracking-wide text-sm  font-medium mt-1
                              `}>
          {value.statut}
          </div>

         </div>)}
        
         </div>}</>}
           
               </div>

           {/*autre fonctionnalite*/}
            <div  className=''>
            <div className='' >Modifier les informations</div>
            <div className='' >Changer de mot de passe</div>
            <div className='' >Creer un utilisateur</div>
            <div className='' >Se deconnecter</div>
             </div>
           </div>

           
    </div>
  )
}
