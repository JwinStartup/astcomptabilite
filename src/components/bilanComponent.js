import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite'
import { RingLoader } from 'react-spinners'
import {useNavigate} from 'react-router-dom'
export default function BilanComponent({retour,id}) {
    const dispatch =useDispatch()
    const navigate =useNavigate()
  useEffect(() => { 
    dispatch(comptabiliteActions.voirByIdBilan(id))
  },[])
  
  const {isLoader,bilan,resultat} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
    const cloturer=()=>{
        dispatch(comptabiliteActions.cloturer({id:id,resultat:resultat}))
    }
     console.log("corps:",bilan,resultat)
  return (
    <div className='z-10 absolute top-[150px] left-[400px] p-4 border bg-white border-gray-100 shadow-lg w-[400px] flex justify-center items-center flex-col'>
       {(isLoader===true||bilan===null)?<RingLoader
        color={"green"}
        size={60}
      />:<> <div  className='flex  flex-col justify-start w-full mb-3'>
        <div className='text-lg font-bold  '>
         Bilan financier
     </div>
         <span className='tracking-wide text-sm text-gray-300 font-medium'>Mois:{bilan.periode} </span>
        
     </div>
      <table className='w-full'>
       <tbody>
         <tr className=' odd:bg-gray-100  bg-white rounded-3xl h-14 m-2  items-center w-full  cursor-pointer'>
           <td className='font-medium text-base text-gray-500 text-start'>Recettes</td>
           <td className='font-medium text-base text-gray-500 text-center'>{bilan.recette} </td>
         </tr>
         <tr className=' odd:bg-gray-100  bg-white rounded-3xl h-14 m-2  items-center w-full  cursor-pointer'>
           <td className='font-medium text-base text-gray-500 text-start'>Charges</td>
           <td className='font-medium text-base text-gray-500 text-center'>{bilan.charge}</td>
         </tr>
       </tbody>
       <tfoot>
         <tr  className='bg-red-100 rounded-3xl h-14 m-2  items-center w-full  cursor-pointer'>
           <td className='font-bold text-base text-red-500 text-start'>Resultat</td>
           <td className='font-medium text-base text-gray-500 text-center'>{bilan.resultat||resultat} </td>
         </tr>
       </tfoot>
      </table>
 <div classeName='flex flex-col mt-3 space-x-3 '>
   <button type="button" onClick={()=>retour()} class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
   retour
   </button>
      {bilan.statut!=='cloturé'&&<button type="button" onClick={()=>cloturer()} class="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ">
   Cloturer
   </button>
     </div>
   </>}
      </div>
  )
}
