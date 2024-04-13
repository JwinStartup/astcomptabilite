import React,{useContext,useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { userActions } from '../reducer/user';
import { useDispatch,useSelector } from 'react-redux';
import {UserContext} from '../context/authContext'
import {useNavigate}from  'react-router-dom'
import Avatar from 'react-avatar'
import { AiOutlineLogout } from "react-icons/ai"
export default function Entete() {
  const { login,logout, user } = useContext(UserContext);
   const {auth} = useSelector((state)=>{
    return state.userReducer
   });
  console.log(auth)
  const navigate = useNavigate()
  const  dispatch = useDispatch()
  const  [useur,setUseur] =useState(auth)
  useEffect(()=>{
    setUseur(auth)
  },[auth])
  return (
    <div className=' w-full flex justify-between'>
          <h1 className='text-2xl m-1 font-bold'>ASTComptable</h1>
{!useur?
        <Link 
             className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium  leading-normal text-primary hover:text-primary-600" 
             to='/login'>
             Connectez-vous
      </Link>
       :
      <div className='flex m-2 items-center gap-1 ' onClick={()=>navigate('/profil')}>
        <Avatar name={auth.user.nom} size="30" round={true} />
      
      </div>
  }
        </div>
  )
}
