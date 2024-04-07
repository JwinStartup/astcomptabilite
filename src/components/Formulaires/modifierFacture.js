import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';
import { userActions } from '../../reducer/user';
import { useForm } from 'react-hook-form';
export default function ModifierFacture({retour,value}) {
  console.log(value)
  const { register, handleSubmit,
  } = useForm({
    defaultValues:value
  }
);
  const dispatch =useDispatch()
  useEffect(() => { 
    dispatch(userActions.listeParent())
  },[])
 
  const onSubmit = (data) => {
    console.log(data)
    //setLoading(true)
   dispatch(comptabiliteActions.modifierFacture(data)).then(()=>{
    retour()
    })
   
  }
  const {isLoader,parents} = useSelector((state)=>{
    return state.userReducer
   });
  return (
    <div className='w-[400px] my-5 border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[125px] left-[350px]'>
        <div className='font-medium text-center  tracking-tight text-[18px] text-black pl-1'>Modifier la facture N°{value._id.slice(value._id.length-3)} de {value.client.nom}  {value.client.prenoms} </div>
        <form   onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col items-center mt-5  space-y-3 w-full h-full' >
        <input {...register("montant")}  type="number"  className='w-[300px] h-10 border-b-2 py-1 text-lg pl-1 placeholder-gray-300' placeholder='Montant prestation' />
        <select {...register("periodeAjouter")}  defaultValue='Janvier 2024' className='outline-none w-[300px] border-b-2 py-1 text-lg'>
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
       <div className='flex flex-row space-x-4'> <button type="button" onClick={()=>retour()} className="border-r text-red-400 hover:text-red-800  font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Retour
        </button>
        <button type='submit' className="text-blue-400  hover:text-blue-800  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center ">
        Modifier
        </button>
        </div>
        </form>
    </div>
  )
}
