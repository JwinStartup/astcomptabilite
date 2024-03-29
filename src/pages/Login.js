import React from 'react'
import Entete from '../components/entete'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
import {useNavigate}from 'react-router-dom'
export default function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit,
    // formState: { errors }
     } = useForm(
  //  { resolver: yupResolver(schema)}
   );
   const dispatch =useDispatch()
  const onSubmit = (data) => {
    console.log(data)
    //setLoading(true)
   dispatch(userActions.login(data)).then(()=>{
    navigate('/')
    })
  }
  return (
    <div className='w-full flex flex-col  items-center justify-center'>
        <Entete />
         <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}  className='flex justify-center w-[550px] mt-6 items-center flex-col space-y-4 p-9 border border-gray-400 rounded-lg shadow-lg' >
         
     <div className='flex flex-col '>
   <p className='text-2xl font-semibold text-black tracking-wider mb-3'>Connectez-vous</p>             
      <div className='flex flex-col mx-4 space-y-4'>
      <input {...register("nom")}  type='text' placeholder='Nom utilisateur' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("password")} type='text' placeholder='Mot de passe' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
     </div> 
     </div>
     
<button type='submit' className='outline-none flex flex-row items-center justify-center mt-3 text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2'>
       <span>   Se connecter</span>
      </button>
    </form>
    </div>
  )
}
