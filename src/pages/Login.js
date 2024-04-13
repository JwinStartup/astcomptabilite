import React,{useContext,useState,useEffect} from 'react'
import Entete from '../components/entete'
import { useDispatch,useSelector } from 'react-redux';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
import {useNavigate}from 'react-router-dom';
import {UserContext} from '../context/authContext'
import { yupResolver } from '@hookform/resolvers/yup';
export default function Login() {
  //const { login, user} = useContext(UserContext);
  const [chargement,setChargement]=useState(false)
  const navigate = useNavigate()
  const schema = yup
.object({
  nom: yup.string('Chaine de caractere requis').required('Veuillez ajouter votre nom'),
  password: yup.string('Chaine de caractere requis').required('Veuillez ajouter votre mot de passe'),
})
.required()
  const { register, handleSubmit,
   formState: {errors,isSubmittting }
     } = useForm(
   { resolver: yupResolver(schema)}
   );
   const dispatch =useDispatch()
  const {isloader,error} = useSelector((state)=>{
    return state.userReducer
   });
  const onSubmit = (data) => {
    console.log(data)
     setChargement(true)
   dispatch(userActions.login(data)).then((d)=>{
     setChargement(false)
     console.log(d)
     
    })
  }
 
  return (
    <div className='w-full flex flex-col  items-center justify-center '>
    {console.log(isloader,chargement)}
      <div className=' w-full flex mb-3'>
          <h1 className='text-2xl m-1 font-bold'>ASTComptable</h1>
        </div>
{error&& <p className='text-red-500 text-md font-semibold  w-64'>le couple nom / Mot de passe n'est pas correct  </p>}
         <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}  className='flex justify-center  mt-16 items-center flex-col space-y-4 p-9 border border-gray-400 rounded-lg shadow-lg w-[300px] 2xl:w-[500px]' >
     <div className='flex flex-col '>
   <p className='text-2xl font-semibold text-black tracking-wider mb-3'>Connectez-vous</p>             
      <div className='flex flex-col mx-1 space-y-4'>
      <input {...register("nom")}  type='text' placeholder='Nom utilisateur' className={`outline-none w-full border-b-2 py-1 text-lg ${!errors.nom?' ':'border-red-500'}`} />
    {errors.nom&&<p className='text-sm font-semibold text-red-500 tracking-wider my-2'>{errors.nom.messages}</p> }
    <input {...register("password")} type='text' placeholder='Mot de passe' className={`outline-none w-full border-b-2 py-1 text-lg ${!errors.password?' ':'border-red-500'}`}/>
      {errors.password&&<p className='text-sm font-semibold text-red-500 tracking-wider my-2'>{errors.password.messages}</p> }
    </div> 
     </div>
    <div className='flex flex-row '>
      <button onClick={()=>navigate('/')} className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-800 mx-2'>
       <span>retour</span>
      </button>
  {chargement==false?<button type='submit' className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-800 mx-2'>
       <span>Se connecter</span>
      
      </button>:<span className='flex flex-row items-center space-x-2 justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-800 mx-2'>
       <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                 </svg>
              Loading...
           </span>}
    </div>
    </form>
    </div>
  )
}
