import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';
import { userActions } from '../../reducer/user';
import { useForm } from 'react-hook-form';
export default function FormulaireCreerFacture({retour}) {
  const { register, handleSubmit,
  } = useForm(
);}
  const [montant,setMontant]=useState(0)
  const dispatch =useDispatch()
  useEffect(() => { 
    dispatch(userActions.listeParent())
  },[])
 
  const onSubmit = (data) => {
    console.log(data)
    //setLoading(true)
   dispatch(comptabiliteActions.creerFacture(data)).then(()=>{
    retour()
    })
   
  }
  const {isLoader,parents} = useSelector((state)=>{
    return state.userReducer
   });
  const  onChangeParent=(e)=>
    {
     const p= parents.find((d)=>d._id===e)
      setMontant(p.montantCours)
    }
  return (
    <div className='w-[500px] h-[300px] border p-3 bg-white border-gray-100 shadow-md rounded-3xl   z-10 absolute top-[150px] left-[400px]'>
        <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Créer une facture</div>
        <form   onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col items-center mt-5  space-y-3 w-full h-full' >
        <select {...register("client")}
              onChange={(e)=>onChangeParent(e.target.value)} className='outline-none w-[400px] border-b-2 py-1 text-lg'>
             <option className='text-gray-200' value=" " >Choississez un parent </option>     
         {parents.map((val,index)=> <option className='' value={val._id} key={index}> {val.nom}  {val.prenoms}</option>)}
        </select>
        <input {...register("montant")} defaultValue={montant} type="number"  className='w-[400px] h-10 border-b-2 py-1 text-lg pl-1 placeholder-gray-300' placeholder='Montant prestation' />
        <select {...register("periodeAjouter")}  defaultValue='Janvier 2024' className='outline-none w-[400px] border-b-2 py-1 text-lg'>
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
       <div className='flex flex-row space-x-4'> <button type="button" onClick={()=>retour()} class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Retour
        </button>
        <button type='submit' class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Creer
        </button>
        </div>
        </form>
    </div>
  )
}
