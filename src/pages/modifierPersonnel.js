import React from 'react'
import Entete from '../components/entete'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
import { IoIosArrowDropleftCircle } from "react-icons/io";
export default function ModifierPersonnels() {
const dispatch =useDispatch()
    const {id}=useParams()
  const navigate=useNavigate()
  const { register, handleSubmit,formState:{isSubmitting}} = useForm(
      { defaultValues: async () => dispatch(userActions.voirPersonnel(id)).then((d)=>{return d.payload })}
);
const onSubmit = (data) => {
 console.log(data)
 //setLoading(true)
dispatch(userActions.modifierPersonnel(data)).then(()=>{
  navigate('/cp')
 })
}
  return (
    <div>
    <Entete />
    <div className="flex  items-center "  onClick={()=>navigate('/cp')} >
        <IoIosArrowDropleftCircle size={30} color="black" style={{paddingRigth:"5px"}}/>
        <h5 className="text-xl font-bold ml-1 tracking-tight text-gray-900  ">Modifier personnel  </h5>
    </div>
         <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex justify-center h-full items-center flex-col space-y-4 p-9 ' >
         
     <div className='flex flex-col '>
      <div className='flex flex-col mx-4 space-y-2'>
      <input {...register("nom")}   type='text' placeholder='Nom' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("prenoms")}   type='text' placeholder='Prenoms' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("cel")}   type='text' placeholder='Cel' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("email")}   type='email' placeholder='Email' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("whatshapp")}   type='text' placeholder='Whatshapp' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("ville")}   type='text' placeholder='ville' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("commune")}   type='text' placeholder='commune' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <select {...register("discipline")} defaultValue='Science' className='outline-none w-[250px] border-b-2 py-1 text-lg'>
            <option>Science </option>
            <option>Litterature</option>
            <option>Mathematique</option>
            <option>Physique chimie</option>
            <option>Histoire Geographie</option>
            <option>Anglais</option>
            <option>Philosophie</option>
        </select>
     </div> 
     </div>
     
<button type='submit' className='outline-none flex flex-row items-center justify-center  font-bold text-lg  px-5 py-2.5 mr-2 mb-2'>
  {isSubmitting? <span>Modifier</span>:<span>
                     <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                     Modifier...
                     </span>}
      </button>
    </form>
  </div>
  )
}
