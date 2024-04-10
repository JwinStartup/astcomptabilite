import React from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
export default function Personnels() {
  const navigate=useNavigate()
  const { register, handleSubmit,
         formState:{isSubmitting}
  } = useForm(
);
const dispatch =useDispatch()
const onSubmit = (data) => {
 console.log(data)
 //setLoading(true)
dispatch(userActions.inscriptionPersonnel(data)).then(()=>{
  navigate('/cp')
 })
}
  return (
    <div>
    <Entete />
    <div className="flex  items-center "  onClick={()=>navigate('/cp')} >
        <IoIosArrowDropleftCircle size={30} color="black" />
        <FaFileInvoice  size={30} color="#1D4ED8" style={{paddingRigth:"5px"}}/>
        <h5 className="text-xl font-bold ml-1 tracking-tight text-gray-900  ">Inscription personnel  </h5>
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
  {isSubmitting? <span>Inscrire</span>:<span>Inscrire...</span>}
      </button>
    </form>




  </div>
  )
}
