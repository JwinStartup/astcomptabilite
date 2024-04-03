import React from 'react'
import Entete from '../components/entete'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
import { useNavigate } from 'react-router-dom';
export default function InscriptionUser({retour}) {
  const navigate=useNavigate()
  const { register, handleSubmit,
    // formState: { errors }
     } = useForm(
  //  { resolver: yupResolver(schema)}
   );
   const dispatch =useDispatch()
  const onSubmit = (data) => {
    console.log(data)
    //setLoading(true)
   dispatch(userActions.inscription(data)).then(()=>{
     navigate('/UserAdmin')
    })
  }
  return (
    <div className='w-full flex flex-col  items-center justify-centerwhite border-gray-100 shadow-md rounded-3xl  z-10 absolute top-[150px] left-[400px]'>
        <Entete />
         <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex justify-center w-[550px] mt-6 items-center flex-col space-y-4 p-9 border border-gray-400 rounded-lg shadow-lg' >
         
     <div className='flex flex-col '>
   <p className='text-2xl font-semibold text-black tracking-wider mb-3'>Inscrivez un utilisateur</p>             
      <div className='flex flex-col mx-4 space-y-4'>
      <input {...register("nom")} type='text' placeholder='Nom utiilisateur' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("email")}  type='text' placeholder='Email' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("password")}  type='text' placeholder='Mot de passe' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("cel")}  type='text' placeholder='Cel ' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <select {...register("role")} defaultValue='Directeur' className='outline-none w-[400px] border-b-2 py-1 text-lg'>
            <option>Directeur</option>
            <option>Administrateur</option>
        </select>
      <select {...register("zone")} defaultValue='Directeur' className='outline-none w-[400px] border-b-2 py-1 text-lg'>
            <option>Cocody</option>
            <option>Bouake</option>
            <option>San pedro</option>
            <option>Yamoussoukro</option>
        </select>
     </div> 
     </div>
     <div className='flex flex-row space-x-4'> <button type="button" onClick={()=>retour()} className="text-white bg-red-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
        Retour
        </button>
        <button type="submit" class="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ">
        Creer
        </button>
        </div>
    </form>
    </div>
  )
}
