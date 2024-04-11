import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { comptabiliteActions } from '../reducer/comptabilite';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../reducer/user';
import {useNavigate} from 'react-router-dom'
export default function CreerCharge() {
  const { register, handleSubmit,
  } = useForm(
);
const dispatch=useDispatch()
const navigate=useNavigate()
const [select, setSelect] = useState('salaire')
const onSubmit = (data) => {
  console.log(data)
 dispatch(comptabiliteActions.creerCharge(data)).then(()=>{
  navigate('/charge')
  })
 
}
useEffect(() => { 
  dispatch(userActions.listePersonnel())
},[])

const {isLoader,personnels} = useSelector((state)=>{
  return state.userReducer
 });
  return (
    <div className='w-[400px]  border p-3 bg-white   '>
        <div className='font-bold  tracking-tight text-xl text-black pl-1'>Creer une Charge</div>
       
        <form   onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col items-center mt-5  space-y-3 w-full h-full' > 
        <select {...register("type")} onChange={(e)=>setSelect(e.target.value)}  defaultValue='salaire' className='outline-none w-[250px] ml-2 border-b-2 py-1 text-md'>
            <option value='salaire'>Salaire personnel</option>
            <option value='eaucourantintent'>Eau-Courant-Internet</option>
            <option value='loyer'>Loyer</option>
            <option value='autreCharge'>Autres charges</option>
        </select>
        <div className='flex flex-col items-center mt-5  space-y-3 w-full '>
        {select==="salaire"&& <select {...register("personnel")}
             defaultValue=" " className='outline-none w-[250px] border-b-2 py-1 text-md'>
              <option className='text-gray-400' value=" " >Choisissez le personnel</option>
        {personnels.map((val,index)=> <option className=''  key={index}> {val.nom}  {val.prenoms}</option>)}
        </select>}
        {select==="autreCharge"&&<input {...register("nomCharge")}  type="text"  className='w-[250px]  border-b-2 py-1 text-md pl-1 placeholder-gray-300' placeholder='Preciser la charge' />}
        <select {...register("periodeAjouter")}   defaultValue='salaire' className='outline-none w-[420px] ml-2 border-b-2 py-1 text-md'>
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
        <input {...register("montant")}  type="text"  className='w-[250px] h-10 border-b-2 py-1 text-md pl-1 placeholder-gray-300' placeholder='Montant ' />
        <textarea {...register("observation")} type="text"    className='w-[250px] border-b-2 py-1 text-md pl-1 placeholder-gray-300' placeholder='Observation...' row={5} col={40}></textarea>
       <div className='flex flex-row space-x-4'> 
        <button type="submit" className="text-black font-bold text-md px-5 py-2.5 text-center inline-flex items-center ">
        Creer
        </button>
        </div>
        </div>
        </form> 
    </div>
  )
}
