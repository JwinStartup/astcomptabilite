import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import Backdrop from '../components/backdrop'
import CreerUser from '../components/creerUser'
import ModifierUser from '../components/modifierUser'
import SupprimerUser from '../components/supprimerUser.js'
import {useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { RingLoader} from 'react-spinners';
import { userActions } from '../reducer/user.js'
const SetComponent=({p,retour,value})=>{
  console.log(p)
  switch (p) {
    case 'CREER':
      return(
        <div>
          <Backdrop/>
        <CreerUser retour={retour}  />
        </div>
      );
    case 'MODIFIER':
      return(
        <div>
          <Backdrop/>
        <ModifierUser retour={retour} value={value}/>
        </div>
      )
    case 'SUPPRIMER':
      return(
        <div>
          <Backdrop/>
        <SupprimerUser retour={retour} value={value} />
        </div>
      )
    default:
      break;
  }
}
export default function FacturesImpayes() {
  const dispatch =useDispatch()
  const [rub , setRub]=useState({nom:'',bol:false,value:null})
  useEffect(() => { 
    dispatch(userActions.liste())
  },[rub])
  
  const {isLoader,users} = useSelector((state)=>{
    return state.userReducer
   });
  const navigate=useNavigate()
  return (
    <div>
         {rub.bol!==false&&<SetComponent p={rub.nom} retour={()=>setRub({bol:false,nom:''})} value={rub.value} />}
        <Entete />
     <div className='  flex justify-between  space-x-2 mx-4'>
     <div className=' mb-3 p-0  tracking-tight text-[22px] text-black font-semibold '><button className=' bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-2' onClick={()=>navigate("/")} > retour</button>Utilisateur </div>
     <div className='  flex justify-between  space-x-2'>
                <button onClick={()=>setRub({nom:'CREER',bol:true})} className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>+ Creer un utiilisateur</button>
            </div>
            </div>
            {isLoader===true?<RingLoader
        color={"green"}
        size={60}
      />:
  <> {users.length===0?<p className='text-center w-full'>Pas d'utilisateur </p>:
            <div className='w-full flex justify-center mt-16 '>
            <table className="w-full mx-2">
  <thead>
    <tr className="">
      <th  className='border-b-2 text-gray-400'>Non </th>
      <th  className='border-b-2 text-gray-400'>Email</th>
      <th  className='border-b-2 text-gray-400'>Cel</th>
      <th  className='border-b-2 text-gray-400'>Zone</th>
     <th  className='border-b-2 text-gray-400'>Role</th>
    </tr>
  </thead>
  <tbody>
  {users.map((value,index)=><tr key={index} className=' odd:bg-gray-100  bg-white rounded-3xl h-14 m-2  items-center w-full hover:bg-green-100 cursor-pointer'>
      <td className='font-medium text-base text-gray-500 text-center'>{value.nom} </td>      
      <td className='font-medium text-base text-gray-500 text-center'>{value.email}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.cel}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.zone}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{value.role}</td>
        <td className= {`font-medium text-base text-center ${value.type==='impaye'?'text-red-500':'text-green-500'}  `}>{value.type}</td>
          <td className='font-medium text-base text-gray-500 text-center 'onClick={()=>setRub({nom:'MODIFIER',bol:true,value:value} )}>Modifier </td>
            <td className='font-medium text-base text-gray-500 text-center 'onClick={()=>setRub({nom:'SUPPRIMER',bol:true,value:value} )}>Supprimer </td>
    </tr>)}
  </tbody>
</table>
</div>
}
</>
}
    
    </div>
  )
}

