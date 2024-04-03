import React from 'react'
import Entete from '../components/entete'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
export default function ModifierPersonnels() {
const dispatch =useDispatch()
    const {id}=useParams()
  const navigate=useNavigate()
  const { register, handleSubmit} = useForm(
      { defaultValues: async () => dispatch(userActions.voirPersonnel(id)).then((d)=>{ console.log(d.payload) })}
);
const onSubmit = (data) => {
 console.log(data)
 //setLoading(true)
dispatch(userActions.modifierPersonnel(data)).then(()=>{
  navigate('/cp/ListePersonnel')
 })
}
  return (
    <div>
    <Entete />
    <div className='flex items-cennter justify-between mx-5 w-[1150px]'>
    <button className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={()=>navigate("/cp/ListePersonnel")} > retour</button>

              <p className=' mb-3 p-0 ml-5  tracking-tight text-2xl text-black font-bold'>Inscription Personnel</p>
             
          </div>
         <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex justify-center h-full items-center flex-col space-y-4 p-9 ' >
         
     <div className='flex flex-col '>
   <p className='text-2xl font-semibold text-black tracking-wider mb-3'>Formateur</p>             
      <div className='flex flex-col mx-4 space-y-4'>
      <input {...register("nom")}   type='text' placeholder='Nom' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("prenoms")}   type='text' placeholder='Prenoms' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("cel")}   type='text' placeholder='Cel' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("email")}   type='email' placeholder='Email' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("whatshapp")}   type='text' placeholder='Whatshapp' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("ville")}   type='text' placeholder='ville' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("commune")}   type='text' placeholder='commune' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <select {...register("discipline")} defaultValue='Science' className='outline-none w-[400px] border-b-2 py-1 text-lg'>
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
     
<button type='submit' className='outline-none flex flex-row items-center justify-center space-x-2  text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2'>
       <span>   S'inscrire</span>
      </button>
    </form>




  </div>
  )
}
