import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';
import { userActions } from '../../reducer/user';
import { useForm } from 'react-hook-form';
export default function FormulaireCreerFacture({retour}) {
  const { register, handleSubmit,
  } = useForm(
)
  const [montant,setMontant]=useState(0)
  const [chargement,setChargement]=useState(false)
  const dispatch =useDispatch()
  useEffect(() => { 
    dispatch(userActions.listeParent())
  },[])
   
  const onSubmit = (data) => {
    setChargement(true)
   dispatch(comptabiliteActions.creerFacture({
     client:data.client,
     montant:montant,
     periodeAjouter:data.periodeAjouter
   }    )).then(()=>{
    setChargement(false)
    retour()
    })
   
  }
  const {isLoader,parents} = useSelector((state)=>{
    return state.userReducer
   });
   const onChangeParent=(e)=>{
        const p= parents.find((d)=>d._id===e)
      setMontant(p.montantCours)
    }
  return (
    <div className='w-[300px] border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[200px] left-[50px]'>
        <div className='font-bold  tracking-tight text-lg text-black pl-1'>Créer une facture</div>
        <form   onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col items-center mt-5  space-y-3 w-full h-full' >
      
         
        <select {...register("client")}
              onChange={(e)=>onChangeParent(e.target.value)}  className='outline-none w-[200px] border-b-2 py-1 text-sm'>
             <option className='text-gray-200 text-sm' value=" " >Choississez un parent </option>     
         {parents.map((val,index)=> <option className=' text-sm' value={val._id} key={index}> {val.nom}  {val.prenoms}</option>)}
        </select>
        
        <input {...register("montant")} disabled value={montant} type="number"  className='w-[200px]  text-sm  h-10 border-b-2 py-1  pl-1 placeholder-gray-300' placeholder='Montant prestation' />
        
           <select {...register("periodeAjouter")}  defaultValue='Janvier 2024' className='outline-none w-[200px] border-b-2 py-1 text-sm'>
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
       <div className='flex flex-row space-x-4 pb-3'> <button type="button" onClick={()=>retour()} className="text-blue-700 hover:text-blue-800 border-r  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center ">
        Retour
        </button>
        
{chargement==false?<button type='submit' className=' bg-blue-700 hover:bg-blue-800  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center'>
       <span>Inscrire</span>
      
      </button>:<span className='flex flex-row items-center space-x-2 justify-center inline-flex items-center px-3 py-2 text-md font-medium text-center text-black'>
       <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                 </svg>
              Loading...
           </span>}
        </div>
        </form>
    </div>
  )
}

