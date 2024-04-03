import React from 'react'
import Entete from '../components/entete'
import { useNavigate,useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
export default function ModifierParents() {
  const {id}=useParams()
  const navigate=useNavigate()
  const { register, handleSubmit,
     } = useForm(
   );
  const dispatch =useDispatch()
  const onSubmit = (data) => {
    console.log(data)
    //setLoading(true)
   dispatch(userActions.modifierParent(data)).then(()=>{
     navigate('/cp/ListeParent')
    })
  }
  useEffect(() => { 
    dispatch(userActions.voirParent(id)).then((d)=>console.log(d))
  },[])
  
  return (
    <div>
      <Entete />
      <div className='flex items-cennter  mx-5 w-[1150px]'>
         <button className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={()=>navigate("/cp/ListeParent")} > retour</button>
                <p className=' mb-3 p-0 ml-5  tracking-tight text-2xl text-black font-bold'>Inscription parent</p>
               
            </div>
           <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex justify-center h-full items-center flex-col space-y-4 p-9 ' >
           
       <div className='flex flex-col '>
     <p className='text-2xl font-semibold text-black tracking-wider mb-3'>Parent d'élèves</p>             
        <div className='flex flex-col mx-4 space-y-4'>
        <input {...register("nom")}  type='text' placeholder='Nom' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
        <input {...register("prenoms")}  type='text' placeholder='Prenoms' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
        <input {...register("cel")}  type='text' placeholder='Cel' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
        <input {...register("email")}  type='text' placeholder='Email' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
        <input {...register("whatshapp")}  type='text' placeholder='Whatshapp' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
        <input {...register("ville")}  type='text' placeholder='Ville' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
        <input {...register("commune")}  type='text' placeholder='Commune' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
        <input {...register("quartier")}  type='text' placeholder='Quartier' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
        <input {...register("NombreEnfant")}  type='text' placeholder="Nombre d'enfant à inscrire" className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
        <input {...register("eleveClasse")}  type='text' placeholder='Les classes' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
       </div>
       </div>
        
    
       
       
<button type='submit' className='outline-none flex flex-row items-center justify-center space-x-2  text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2'>
       
        
         <span>   S'inscrire</span>
        </button>
      </form>




    </div>
  )
}
