import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { comptabiliteActions } from '../reducer/comptabilite';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../reducer/user';
import {useNavigate,useParams} from 'react-router-dom'
import Entete from '../components/entete'
import { IoIosArrowDropleftCircle } from "react-icons/io";
export default function ModifierCharge() {
  const {id}=useParams()
  const { register, handleSubmit,
  } = useForm( {
     defaultValues: async () => dispatch(comptabiliteActions.voirCharge(id)).then((d)=>{return d.payload})
  }
);
const dispatch=useDispatch()
const navigate=useNavigate()
const [select, setSelect] = useState('salaire')
const [chargement,setChargement]=useState(false)
const onSubmit = (data) => {
  console.log(data)
 dispatch(comptabiliteActions.modifierCharge(data)).then(()=>{
  navigate('/charges')
  })
 
}
useEffect(() => { 
  dispatch(userActions.listePersonnel())
},[])

const {isLoader,personnels} = useSelector((state)=>{
  return state.userReducer
 });
  return (
     <div>
      <Entete />
      <div className="flex  items-center "  onClick={()=>navigate('/charges')} >
        <IoIosArrowDropleftCircle size={30} style={{paddingRigth:"5px"}} color="black" />
        <h5 className="text-xl font-bold ml-1 tracking-tight text-gray-900  ">Modifier une charge </h5>
    </div>
        <form   onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col items-center mt-5  space-y-3 w-full h-full' > 
        <select {...register("type")} onChange={(e)=>setSelect(e.target.value)}  defaultValue='salaire' className='outline-none w-[300px] ml-2 border-b-2 py-1 text-md'>
            <option value='salaire'>Salaire personnel</option>
            <option value='eaucourantintent'>Eau-Courant-Internet</option>
            <option value='loyer'>Loyer</option>
            <option value='autreCharge'>Autres charges</option>
        </select>
        <div className='flex flex-col items-center mt-5  space-y-3 w-full '>
        {select==="salaire"&& <select {...register("personnel")}
             defaultValue=" " className='outline-none w-[300px] border-b-2 py-1 text-md'>
              <option className='text-gray-400' value=" " >Choisissez le personnel</option>
        {personnels.map((val,index)=> <option className=''  key={index}> {val.nom}  {val.prenoms}</option>)}
        </select>}
        {select==="autreCharge"&&<input {...register("nomCharge")}  type="text"  className='w-[300px]  border-b-2 py-1 text-md pl-1 placeholder-gray-300' placeholder='Preciser la charge' />}
        <select {...register("periodeAjouter")}   defaultValue='salaire' className='outline-none w-[300px] ml-2 border-b-2 py-1 text-md'>
        <option>Janvier 2024</option>
            <option>Fevrier 2024</option>
            <option>Mars 2024</option>
            <option>Avril 2024</option>
            <option>Mai 2024</option>
            <option>Juin 2024</option>
            <option>Juillet 2024</option>
            <option>Août 2024</option>
            <option>Sepptembre 2024</option>
            <option>Octobre 2024</option>
            <option>Novembre 2024</option>
            <option>Decembre 2024</option>
        </select>
        <input {...register("montant")}  type="text"  className='w-[300px] h-10 border-b-2 py-1 text-md pl-1 placeholder-gray-300' placeholder='Montant ' />
        <textarea {...register("observation")} type="text"    className='w-[300px] border-b-2 py-1 text-md pl-1 placeholder-gray-300' placeholder='Observation...' row={5} col={40}></textarea>
       <div className='flex flex-row space-x-4'> 
        {chargement==false?<button type='submit' className='outline-none flex flex-row items-center justify-center   font-bold  text-lg  px-5 py-2.5 mr-2 mb-2'>
       <span>Modifier</span>
      
      </button>:<span className='flex flex-row items-center space-x-2 justify-center inline-flex items-center px-3 py-2 text-md font-medium text-center text-black'>
       <svg aria-hidden="false" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                 </svg>
              Loading...
           </span>}  
        </div>
        </div>
        </form> 
    </div>
  )
}
