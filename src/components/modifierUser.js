import React from 'react'
import Entete from '../components/entete'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
import { useNavigate } from 'react-router-dom';
import { AiFillCloseCircle } from "react-icons/ai";
export default function ModifierUser({retour,value}) {
  console.log(value)
  const navigate=useNavigate()
  const { register, handleSubmit,
    // formState: { errors }
     } = useForm(
    {
      defaultValues:value
    }
   );
   const dispatch =useDispatch()
  const onSubmit = (data) => {
    console.log(data)
    //setLoading(true)
   dispatch(userActions.modifier(data)).then(()=>{
     retour()
    })
  }
  return (
         <form  className='w-[300px] onSubmit={handleSubmit(onSubmit)}  border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[70px] left-[50px]'>
      <div className='absolute right-0 top-0 m-1 cursor-pointer  z-50 '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>retour()} />
           </div> 
      <div className='flex flex-col '>
     <p className='text-lg font-semibold text-black tracking-wider mb-3'>Inscrivez un utilisateur</p>             
        <div className='flex flex-col mx-4 space-y-2'>
        <input {...register("nom")} type='text' placeholder='Nom utiilisateur' className='outline-nonew-[250px] border-b-2 py-1 text-sm'/>
          <input {...register("email")}  type='text' placeholder='Email' className='outline-nonew-[250px] border-b-2 py-1 text-sm'/>
          <input {...register("password")}  type='text' placeholder='Mot de passe' className='outline-nonew-[250px] border-b-2 py-1 text-sm'/>
          <input {...register("cel")}  type='text' placeholder='Cel ' className='outline-nonew-[250px] border-b-2 py-1 text-sm'/>
      <select {...register("role")} defaultValue='Directeur' className='outline-nonew-[250px] border-b-2 py-1 text-sm'>
            <option>Directeur</option>
            <option>Administrateur</option>
        </select>
      <select {...register("zone")} defaultValue='Directeur' className='outline-nonew-[250px] border-b-2 py-1 text-sm'>
            <option>Cocody</option>
            <option>Bouake</option>
            <option>San pedro</option>
            <option>Yamoussoukro</option>
        </select>
       </div>
       </div>
   
        <div className='flex flex-col items-center my-2  w-full'>
        <button  
         type="submit"  className="text-green-700  font-medium  text-md px-3 py-2 text-center inline-flex items-center">
        </button>
        </div>
    </form>
    )
  }
