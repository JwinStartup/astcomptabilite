import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { userActions } from '../reducer/user';
import { useDispatch,useSelector } from 'react-redux';
import {UserContext} from '../context/authContext'
import {useNavigate}from  'react-router-dom'
export default function Entete() {
  const { login,logout, {me,auth} } = useContext(UserContext);
  const navigate = useNavigate
  const  dispatch = useDispatch()
  const me = useSelector((state)=>{
    return state.userReducer.user
   });
  console.log('me:',me)
console.log('auth:'auth)
  return (
    <div className=' w-full flex justify-between'>
          <h1 className='text-2xl m-3 text-green-300'>ASTComptable</h1>
           {auth===false&&<Link to='/login'>connectez-vous</Link>}
           {me!==null&&<div className='flex m-2 items-center gap-1 '>
            <div className='bg-gray-400 rounded-full w-14 h-14'/>
             <p className=''>{me.nom} </p>
             <div className='bg-gray-600 rounded-full w-2 h-2'/>
             <p className='text-sm tracking-widest text-green-300 pb-0.5'>{me.role}</p>
        </div>}
        {me!==null&&<button onClick={()=> dispatch(userActions.deconnecte().then(()=>logout())} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    deconnecte
    </button>}
        </div>
  )
}
