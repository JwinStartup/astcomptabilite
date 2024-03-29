import React, { useState,useEffect } from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import Backdrop from '../components/backdrop'
import SupprimerParent from '../components/supprimerParent.js'
import VoirEnfant from '../components/voirEnfant.js'
import ModifierFormateur from '../components/modifierFormateur.js'
import { useDispatch,useSelector } from 'react-redux';
import { userActions } from '../reducer/user';
import { RingLoader} from 'react-spinners';
const SetComponent=({p,retour})=>{
  console.log(p)
  switch (p) {
    case 'SUPPRIMER':
      return(
        <div>
          <Backdrop/>
        <SupprimerParent retour={retour} />
        </div>
      );
   
    case 'MODIFIERFORMATEUR':
      return(
        <div>
          <Backdrop/>
        <ModifierFormateur retour={retour} />
        </div>
      )
 
  
    case 'VOIRENFANT':
      return(
        <div>
          <Backdrop/>
        <VoirEnfant retour={retour} />
        </div>
      )
  
  
    default:
      break;
  }
}

export default function ParentComponent() {
  const dispatch =useDispatch()
  const {isLoader,parents,loading} = useSelector((state)=>{
    return state.userReducer
   });
   useEffect(() => { 
    dispatch(userActions.listeParent())
  },[])

    const navigate = useNavigate()
    const [rub , setRub]=useState({nom:'',bol:false})
  return (
    <div>     
      {console.log(loading)}
       {rub.bol!==false&&<SetComponent p={rub.nom} retour={()=>setRub({bol:false,nom:''})}/>}
         <div className='  flex justify-between  space-x-2 mx-4'>
         <button className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={()=>navigate("/cp")} > retour</button>
      <p className=' mb-3 p-0  tracking-tight text-[22px] text-black font-semibold '>Liste des parents </p>
     <div className='  flex justify-between  space-x-2'>
        
                <button onClick={()=>navigate("/inscription/parents")} className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>+ Ajouter un parent</button>
            </div>
            </div>
{isLoader?<RingLoader
        color={"green"}
        size={60}
      />:
  <> {parents.length===0?<p className='text-center w-full'>Pas de parents  inscrits </p>:
         <div className='w-full flex justify-center mt-16 '>

<table className="w-full mx-2">
<thead>
<tr className="">
<th  className='border-b-2 text-gray-400'>Nom</th>
<th  className='border-b-2 text-gray-400'>Prenom</th>
<th  className='border-b-2 text-gray-400'>Cel</th>
<th  className='border-b-2 text-gray-400'>Whatshapp</th>
<th  className='border-b-2 text-gray-400'>Ville</th>
<th  className='border-b-2 text-gray-400'>Commune</th>
<th  className='border-b-2 text-gray-400'>Formateur</th>





</tr>
</thead>
<tbody>
 {parents.map((value,index)=><tr key={index} className=' odd:bg-gray-100  bg-white rounded-3xl h-14 m-2  items-center w-full hover:bg-green-100 cursor-pointer'>
 <td className='font-medium text-base text-gray-500 text-center'>{value.nom}</td>
<td className='font-medium text-base text-gray-500 text-center'> {value.prenoms}</td>
   <td className='font-medium text-base text-gray-500 text-center'>{value.cel}</td>
   <td className='font-medium text-base text-gray-500 text-center'>{value.whatshapp}</td>
   <td className='font-medium text-base text-gray-500 text-center'>{value.commune}</td>
   <td className='font-medium text-base text-gray-500 text-center'>{value.quartier}</td>
   <td className='font-medium text-base text-gray-500 text-center'>{value.eleveNom} {value.elevePrenoms}</td>
   <td className='font-medium text-base text-gray-500 text-center 'onClick={()=>setRub({nom:'VOIRENFANT',bol:true})}>Voir Enfant </td>
   <td className='font-medium text-base text-gray-500 text-center 'onClick={()=>navigate("/inscription/parents")}>Modifier </td>
   <td className='font-medium text-base text-gray-500 text-center 'onClick={()=>setRub({nom:'MODIFIERFORMATEUR',bol:true})}>Modifier Formateur </td>
   <td className='font-medium text-base text-gray-500 text-center 'onClick={()=>setRub({nom:'SUPPRIMER',bol:true})}>Supprimer </td>   
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
