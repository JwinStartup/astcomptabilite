import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { userActions } from '../reducer/user';
import { useDispatch,useSelector } from 'react-redux';
import {UserContext} from '../context/authContext'
import {useNavigate}from  'react-router-dom'
import { AiOutlineLogout } from "react-icons/ai"
export default function Entete() {
  const { login,logout, user } = useContext(UserContext);
  const navigate = useNavigate()
  const  dispatch = useDispatch()
 
console.log(user)
const UserConst=({p})=> { 
  console.log(p)
  if(p==null){
    return(
       <Link 
             className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600" 
             to='/login'>
             Connectez-vous
      </Link>
    )
  }else{
  return ( 
    <div className='flex m-2 items-center gap-1 '>
    {console.log(user)}
             <p className=''>{p.nom} </p>
             <div className='bg-gray-600 rounded-full w-2 h-2'/>
             <p className='text-sm tracking-widest text-green-300 pb-0.5'>{p.role}</p>
           <Link 
             className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-red-400 " 
             >
             Deconnetez-vous
      </Link>
      </div>)
  }
}
  return (
    <div className=' w-full flex justify-between'>
          <h1 className='text-2xl m-1 font-bold'>ASTComptable</h1>
             <UserConst p={user.me} />
        </div>
  )
}
