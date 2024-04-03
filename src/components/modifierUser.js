import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { comptabiliteActions } from '../reducer/comptabilite';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../reducer/user';

export default function ModifierUser({retour,value}) {
  const { register, handleSubmit,
  } = useForm(
);
const dispatch=useDispatch()
const [select, setSelect] = useState('salaire')
const onSubmit = (data) => {
  console.log(data)
 dispatch(comptabiliteActions.creerCharge(data)).then(()=>{
  retour()
  })
 
}
useEffect(() => { 
  dispatch(userActions.listePersonnel())
},[])

const {isLoader,personnels} = useSelector((state)=>{
  return state.userReducer
 });
  return (
    <div className='w-[500px]  border p-3 bg-white border-gray-100 shadow-md rounded-3xl   z-10 absolute top-[150px] left-[400px]'>
        <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Ajouter une Charge</div>
       
        <form   onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col items-center mt-5  space-y-3 w-full h-full' > 
        <select {...register("type")} onChange={(e)=>setSelect(e.target.value)}  defaultValue='salaire' className='outline-none w-[420px] ml-2 border-b-2 py-1 text-lg'>
            <option value='salaire'>Salaire personnel</option>
            <option value='eaucourantintent'>Eau-Courant-Internet</option>
            <option value='loyer'>Loyer</option>
            <option value='autreCharge'>Autres charges</option>
        </select>
        <div className='flex flex-col items-center mt-5  space-y-3 w-full h-full'>
        {select==="salaire"&& <select {...register("personnel")}
             defaultValue=" " className='outline-none w-[400px] border-b-2 py-1 text-lg'>
              <option className='text-gray-400' value=" " >Choisissez le personnel</option>
        {personnels.map((val,index)=> <option className=''  key={index}> {val.nom}  {val.prenoms}</option>)}
        </select>}
        {select==="autreCharge"&&<input {...register("nomCharge")}  type="text"  className='w-[400px] h-10 border-b-2 py-1 text-lg pl-1 placeholder-gray-300' placeholder='Preciser la charge' />}
        <select {...register("periodeAjouter")}   defaultValue='salaire' className='outline-none w-[420px] ml-2 border-b-2 py-1 text-lg'>
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
        <input {...register("montant")}  type="text"  className='w-[400px] h-10 border-b-2 py-1 text-lg pl-1 placeholder-gray-300' placeholder='Montant ' />
        <textarea {...register("observation")} type="text"    className='w-[400px] border-b-2 py-1 text-lg pl-1 placeholder-gray-300' placeholder='Observation...' row={5} col={40}></textarea>
       <div className='flex flex-row space-x-4'> <button type="button" onClick={()=>retour()} class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Retour
        </button>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Creer
        </button>
        </div>
        </div>
        </form> 
    </div>
  )
}
