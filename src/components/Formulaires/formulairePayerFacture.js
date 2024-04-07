import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';

export default function FormulairePayerFacture({retour,value}) {
 const [select, setSelect] = useState('')
 const { register, handleSubmit,
 } = useForm(
);
 const dispatch =useDispatch()

 const onSubmit = (data) => {
   console.log(data)
   //setLoading(true)
  dispatch(comptabiliteActions.payerFacture({mode:data.mode,idFacture:value._id,ref:data.ref})).then(()=>{
   retour()
   })
  
 }
  console.log(value)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-[400px]  border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[125px] left-[350px]'>
      <div className='flex flex-row justify-between w-full'> 
        <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Payer une facture</div>
        <div className='font-medium  tracking-tight text-[14px] text-green-400 pl-1'>N°  {value._id.slice(value._id.length-3)} </div>
      </div> 
      <div className='flex flex-row w-full  justify-between my-4'>
        <div className='ml-7'>
        <div className='text-lg font-medium text-gray-500'>{value.client.nom} {value.client.prenoms}</div>
        <div className='text-sm font-medium text-gray-500'>{value.client.cel}</div>

        </div>
        <div>
            <div className='font-bold  tracking-wide text-[22px] text-black '>{value.montant} FCFA</div>
            <div className='font-medium text-center tracking-tight text-[11px] text-red-400 '>Montant prestation</div>
            <div className='font-bold  tracking-tight text-sm text-black '>Periode : {value.periode} </div>

        </div>

      </div>
       


      <div className='mx-5 w-full'>
       <label  className="w-full py-4 ms-2   text-sm font-medium text-red-500">Mode de paiement :</label>
        <select {...register("mode")} onChange={(e)=>setSelect(e.target.value)}  defaultValue='espece' className='w-[200px] outline-none ml-3  border-b-2  text-lg'>
            <option value='espece'>Espece</option>
            <option value='orangemoney'>Orange money</option>
            <option value='mtnmoney'>MTN money</option>
            <option value='moovnmoney'>Moov money</option>
            <option value='wave'>Wave</option>
        </select>
        </div>
        <div className='mx-7 mt-3'>
       {(select==='orangemoney'||select==='mmtnmoney'||select==='moovnmoney'||select==='wave')&&<input type="text" {...register("ref")}  className='w-full h-10 border-b-2 mb-2 text-lg pl-1 placeholder-gray-300' placeholder='id transaction' />}
        </div>
        <div className='flex flex-col items-center my-2  space-y-3 w-full h-full'>
        <div className='flex flex-row space-x-6'>  <button onClick={()=>retour()} type="button" className="text-blue-400 border-r  hover:text-blue-700   font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center ">
        Retour
        </button>
        <button type="submit" className="text-red-400 hover:text-red-700  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center ">
        Payer
        </button> </div>
        </div>
    </form>
  )
}
