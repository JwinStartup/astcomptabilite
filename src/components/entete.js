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
 

  return (
    <div className=' w-full flex justify-between'>
          <h1 className='text-2xl m-3 text-green-300'>ASTComptable</h1>
           {user.me!==null&&<div className='flex m-2 items-center gap-1 '>
            <div className='bg-gray-400 rounded-full w-14 h-14'/>
             <p className=''>{user.me.nom} </p>
             <div className='bg-gray-600 rounded-full w-2 h-2'/>
             <p className='text-sm tracking-widest text-green-300 pb-0.5'>{user.me.role}</p>
      
      </div>}
           {user.me==null?
             <Link to='/login'>connectez-vous</Link>:
             <button onClick={()=> dispatch(userActions.deconnecte()).then(()=>logout()).then(()=>navigate('/login'))} type="button" className=" h-11 text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                <AiOutlineLogout size={25} color="red"/>
                Deconnecte
              </button>
           }
        </div>
  )
}
