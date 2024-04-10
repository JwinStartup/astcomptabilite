import React from 'react'
import Entete from '../components/entete'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDropleftCircle } from "react-icons/io";
export default function InscriptionUser() {
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
     navigate('/')
    })
  }
  return (
    <div>
      <Entete />
      <div className="flex  items-center "  onClick={()=>navigate('/cp')} >
        <IoIosArrowDropleftCircle size={30} style={{paddingRigth:"5px"}} color="black" />
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900  ">Inscription parent  </h5>
    </div>
           <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex justify-center h-full items-center flex-col space-y-4 p-9 ' >
           
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
     </div> 
     </div>
     
<button type='submit' className='outline-none flex flex-row items-center justify-center mt-3 text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2'>
       <span>S'inscrire</span>
      </button>
    </form>
    </div>
  )
}
