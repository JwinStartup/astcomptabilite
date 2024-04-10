import React from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
export default function Parents() {
  const navigate=useNavigate()
  const { register, handleSubmit,
         formState:{isSubmitting}
     } = useForm(
   );
  const dispatch =useDispatch()
  const onSubmit = (data) => {
    console.log(data)
    //setLoading(true)
   dispatch(userActions.inscriptionParent(data)).then(()=>{
     navigate('/cp')
    })
  }
  return (
    <div>
      <Entete />
      <div className="flex  items-center "  onClick={()=>navigate('/cp')} >
        <IoIosArrowDropleftCircle size={30} color="black" />
        <FaFileInvoice  size={30} color="#1D4ED8" style={{paddingRigth:"5px"}}/>
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900  ">Inscription parent  </h5>
    </div>
           <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex justify-center h-full items-center flex-col space-y-4 p-9 ' >
           
       <div className='flex flex-col '>
        <div className='flex flex-col mx-4 space-y-2'>
        <input {...register("nom")}  type='text' placeholder='Nom' className='outline-none w-[250px] border-b-2 py-1 text-md'/>
        <input {...register("prenoms")}  type='text' placeholder='Prenoms' className='outline-none w-[250px] border-b-2 py-1 text-md'/>
        <input {...register("cel")}  type='text' placeholder='Cel' className='outline-none w-[250px] border-b-2 py-1 text-md'/>
        <input {...register("email")}  type='text' placeholder='Email' className='outline-none w-[250px] border-b-2 py-1 text-md'/>
        <input {...register("whatshapp")}  type='text' placeholder='Whatshapp' className='outline-none w-[250px] border-b-2 py-1 text-md'/>
        <input {...register("ville")}  type='text' placeholder='Ville' className='outline-none w-[250px] border-b-2 py-1 text-md'/>
        <input {...register("commune")}  type='text' placeholder='Commune' className='outline-none w-[250px] border-b-2 py-1 text-md'/>
        <input {...register("montantCours")}  type='number' placeholder='Montant du cours à domicile' className='outline-none w-[250px] border-b-2 py-1 text-md'/>
        <input {...register("commission")}  type='number' placeholder='Commission sur le Montant' className='outline-none w-[250px] border-b-2 py-1 text-md'/>
        <input {...register("nombreEnfant")}  type='number' placeholder="Nombre d'enfant à inscrire" className='outline-none w-[250px] border-b-2 py-1 text-md'/>
       </div>
       </div>
        
    
       
       
      <button type='submit' className='outline-none flex flex-row items-center justify-center   font-bold  text-lg  px-5 py-2.5 mr-2 mb-2'>
       
        
  {isSubmitting? <span>Inscrire</span>: <span>Inscrire...</span>}
        </button>
      </form>




    </div>
  )
}

