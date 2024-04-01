import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import Backdrop from '../components/backdrop'
import SupprimerPersonnel from '../components/supprimerPersonnel.js'
import { useDispatch,useSelector } from 'react-redux';
import { userActions } from '../reducer/user.js'
import { RingLoader } from 'react-spinners'

export default function ListePersonnel() {
    const navigate = useNavigate()
    const dispatch =useDispatch()
  useEffect(() => { 
    dispatch(userActions.listePersonnel())
  },[])
  
  
    const [rub , setRub]=useState(false)
    const {isLoader,personnels}  = useSelector((state)=>{
      return state.userReducer
     });

    return (
      <div>     
      {rub!==false&&<div>
          <Backdrop/>
        <SupprimerPersonnel retour={()=>setRub({bol:false,value:null})} rub={rub}} />
        </div>}
         <Entete />
{console.log(personnels,isLoader)}

         <div className='  flex justify-between  space-x-2 mx-4'>
         <button className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={()=>navigate("/cp")} > retour</button>
     <p className=' mb-3 p-0  tracking-tight text-[22px] text-black font-semibold '>Liste du personnel </p>
    
    
     <div className='  flex justify-between  space-x-2'>
        
                <button onClick={()=>navigate('/inscription/personnels')} className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>+ Ajouter un personnel</button>
            </div>
            </div>


{isLoader===true?<RingLoader
        color={"green"}
        size={60}
      />:
  <> {personnels.length===0?<p className='text-center w-full'>Pas de personnel  inscrits </p>:
         <div className='w-full flex justify-center mt-16 '>

<table className="w-full mx-2">
<thead>   
<tr className="">
<th  className='border-b-2 text-gray-400'>Nom</th>
<th  className='border-b-2 text-gray-400'>Prenom</th>
<th  className='border-b-2 text-gray-400'>Ville</th>
<th  className='border-b-2 text-gray-400'>Commune</th>
<th  className='border-b-2 text-gray-400'>Discipline</th>
<th  className='border-b-2 text-gray-400'>Cel</th>
<th  className='border-b-2 text-gray-400'>Whatshapp</th>





</tr>
</thead>
<tbody>

 {personnels.map((value,index)=><tr key={index} className=' odd:bg-gray-100  bg-white rounded-3xl h-14 m-2  items-center w-full hover:bg-green-100 cursor-pointer'>
 <td className='font-medium text-base text-gray-500 text-center'>{value.nom}</td>
<td className='font-medium text-base text-gray-500 text-center'> {value.prenoms}</td>
   <td className='font-medium text-base text-gray-500 text-center'>{value.ville}</td>
   <td className='font-medium text-base text-gray-500 text-center'>{value.commune}</td>
   <td className='font-medium text-base text-gray-500 text-center'>{value.discipline}</td>
   <td className='font-medium text-base text-gray-500 text-center'>{value.cel}</td>
   <td className='font-medium text-base text-gray-500 text-center'>{value.whatshapp}</td>
   <td className='font-medium text-base text-gray-500 text-center ' onClick={()=>navigate('/inscription/personnels')}>Modifier </td>
<td className='font-medium text-base text-gray-500 text-center 'onClick={()=>setRub({bol:true,value:value})}>Supprimer </td>    
   </tr> )}
  
</tbody>
</table>
    </div>
     }
  </>
}
    </div>
  )
}
