import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';

export default function FormulairePayerFacture({retour,value}) {
 const [select, setSelect] = useState('')
 const [chargement, setChargement] = useState(false)
 const { register, handleSubmit,
 } = useForm(
);
 const dispatch =useDispatch()

 const onSubmit = (data) => {
   console.log(data)
  setChargement(true)
  dispatch(comptabiliteActions.payerFacture({mode:data.mode,idFacture:value._id,ref:data.ref})).then(()=>{
  setChargement(false)
   retour()
   })
  
 }
  console.log(value)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-[300px]  border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[100px] left-[30px]'>
      <div className='flex flex-row justify-between w-full'> 
        <div className='font-bold  tracking-tight text-lg text-black pl-1'>Payer une facture</div>
        <div className='font-medium  tracking-tight text-sm text-green-400 pl-1'>N°  {value?._id.slice(value?._id.length-3)} </div>
      </div> 
      <div className='flex flex-row w-full  justify-between my-4'>
        <div className='ml-7'>
        <div className='text-sm font-medium text-gray-500'>{value.client.nom} {value?.client.prenoms}</div>
        <div className='text-xs font-medium text-gray-500'>{value.client.cel}</div>

        </div>
        <div>
            <div className='font-bold  tracking-wide text-md text-black '>{value.montant} FCFA</div>
            <div className='font-medium text-center tracking-tight text-xs text-red-400 '>Montant prestation</div>
            <div className='font-bold  tracking-tight text-sm text-black '>Periode : {value?.periodeAjouter} </div>

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
        {chargement==false?<button type='submit' className='text-red-400 hover:text-red-700  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center '>
       <span>Payer</span>
      
      </button>:<span className='flex flex-row items-center space-x-2 justify-center inline-flex items-center px-3 py-2 text-md font-medium text-center text-red-400'>
       <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                 </svg>
              Loading...
           </span>} </div>
        </div>
    </form>
  )
}

