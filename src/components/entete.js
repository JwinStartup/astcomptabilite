import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { userActions } from '../reducer/user';
import { useDispatch,useSelector } from 'react-redux';
import {UserContext} from '../context/authContext'
import {useNavigate}from  'react-router-dom'
export default function Entete() {
  const { login,logout, user } = useContext(UserContext);
  const navigate = useNavigate
  const  dispatch = useDispatch()
  const me = useSelector((state)=>{
    return state.userReducer.user
   });
  console.log('me:',user.me)
console.log('auth:',user.auth)
  return (
    <div className=' w-full flex justify-between'>
          <h1 className='text-2xl m-3 text-green-300'>ASTComptable</h1>
           {user.me!==null&&<div className='flex m-2 items-center gap-1 '>
            <div className='bg-gray-400 rounded-full w-14 h-14'/>
             <p className=''>{user.me.nom} </p>
             <div className='bg-gray-600 rounded-full w-2 h-2'/>
             <p className='text-sm tracking-widest text-green-300 pb-0.5'>{user.me.role}</p>
      
      </div>}
           {user.auth!==false?
             <Link to='/login'>connectez-vous</Link>:
             <button onClick={()=> dispatch(userActions.deconnecte().then(()=>logout())} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             deconnecte
             </button>}
        </div>
  )
}
