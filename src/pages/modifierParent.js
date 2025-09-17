import React , {useEffect,useState} from 'react'
import Entete from '../components/entete'
import { useNavigate,useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
import { IoIosArrowDropleftCircle } from "react-icons/io";
export default function ModifierParents() {
  const {id}=useParams()
  const [chargement,setChargement]=useState(false)
  const navigate=useNavigate()
  const { register, handleSubmit,
         formState:{isSubmitting}
     } = useForm(
    {
  defaultValues: async () => dispatch(userActions.voirParent(id)).then((d)=>{return d.payload})
}
   );
  const dispatch =useDispatch()
  const onSubmit = (data) => {
    setChargement(true)
   dispatch(userActions.modifierParent(data)).then(()=>{
    setChargement(true)
     navigate('/cp/ListeParent')
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      <Entete />
      <div className="flex items-center gap-2 px-4 pt-4 cursor-pointer" onClick={() => navigate('/cp')}>
        <IoIosArrowDropleftCircle size={30} className="text-blue-700" />
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">Modifier parent</h5>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
        className='flex justify-center items-center flex-col space-y-6 p-6 w-full'
      >
        <div className='bg-white rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col gap-4'>
          <select
            {...register("civilite")}
            defaultValue="M"
            className='outline-none w-full border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition'
          >
            <option value="M">M</option>
            <option value="Mme">Mme</option>
          </select>
          <input {...register("nom")} type='text' placeholder='Nom' className='outline-none w-full border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition' />
          <input {...register("prenoms")} type='text' placeholder='Prénoms' className='outline-none w-full border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition' />
          <input {...register("cel")} type='text' placeholder='Cel' className='outline-none w-full border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition' />
          <input {...register("email")} type='text' placeholder='Email' className='outline-none w-full border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition' />
          <input {...register("whatshapp")} type='text' placeholder='WhatsApp' className='outline-none w-full border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition' />
          <input {...register("ville")} type='text' placeholder='Ville' className='outline-none w-full border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition' />
          <input {...register("commune")} type='text' placeholder='Commune' className='outline-none w-full border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition' />
          <div className='flex flex-row space-x-4 justify-center'>
            <button
              type="button"
              onClick={() => navigate('/cp/ListeParent')}
              className='flex items-center justify-center font-bold text-lg px-6 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition'
            >
              Annuler
            </button>
            {chargement === false ?
              <button
                type='submit'
                className='flex items-center justify-center font-bold text-lg px-6 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition'
              >
                Modifier
              </button>
              :
              <span className='flex items-center space-x-2 text-blue-700 font-medium'>
                <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                Loading...
              </span>
            }
          </div>
        </div>
      </form>
    </div>
  )
}
