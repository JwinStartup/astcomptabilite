import React, {useEffect,useState} from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
import { IoIosArrowDropleftCircle } from "react-icons/io";
export default function Enfants() {
 const [par,setPar] = useState([])
 const [chargement,setChargement]=useState(false)
  const navigate=useNavigate()
  const { register, handleSubmit,
         formState:{isSubmitting}
  } = useForm(
);
const dispatch =useDispatch()
const onSubmit = (data) => {
 setChargement(true)
dispatch(userActions.inscriptionEnfant(data)).then(()=>{
 setChargement(false)
  navigate('/cp')
 })
}
  useEffect(() => { 
    dispatch(userActions.listeParent())
  },[])
 useEffect(() => { 
  dispatch(userActions.listePersonnel())
},[])

const {personnels} = useSelector((state)=>{
  return state.userReducer
 });
  const {parents} = useSelector((state)=>{
    return state.userReducer
   });
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Entete />
      <div className="flex items-center px-4 pt-6 cursor-pointer" onClick={()=>navigate('/cp')} >
        <IoIosArrowDropleftCircle size={30} style={{paddingRight:"5px"}} color="black" />
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900">Inscription élève</h5>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
        className='flex justify-center items-center flex-col py-8 px-2'
      >
        <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8 mt-6'>
          <div className='flex flex-col space-y-4'>
            <input {...register("nom")} type='text' placeholder='Nom'
              className='outline-none w-full border-b-2 py-2 px-2 text-md focus:border-blue-500 transition-all duration-200'
            />
            <input {...register("prenoms")} type='text' placeholder='Prenoms'
              className='outline-none w-full border-b-2 py-2 px-2 text-md focus:border-blue-500 transition-all duration-200'
            />
            <select {...register("genre")} defaultValue='Homme'
              className='outline-none w-full border-b-2 py-2 px-2 text-lg focus:border-blue-500 transition-all duration-200 bg-transparent'
            >
              <option>Homme</option>
              <option>Femme</option>
            </select>
            <input {...register("cel")} type='text' placeholder='Cel'
              className='outline-none w-full border-b-2 py-2 px-2 text-md focus:border-blue-500 transition-all duration-200'
            />
            <input {...register("ville")} type='text' placeholder='Ville'
              className='outline-none w-full border-b-2 py-2 px-2 text-md focus:border-blue-500 transition-all duration-200'
            />
            <input {...register("commune")} type='text' placeholder='Commune'
              className='outline-none w-full border-b-2 py-2 px-2 text-md focus:border-blue-500 transition-all duration-200'
            />
            <label className="block">
              {par.length!==0 && 
                <div>
                  {par.map((i, idx)=>
                    <span key={idx} className='bg-gray-300 p-2 text-black font-bold rounded mr-2 mb-2 inline-block'>
                      {i.nom} {i.prenoms}
                    </span>
                  )}
                </div>
              }
              <span className="block mb-1 text-md font-medium">Parent :</span>
              <select {...register("parent")}
                defaultValue=" "
                className='outline-none w-full border-b-2 py-2 px-2 text-md focus:border-blue-500 transition-all duration-200 bg-transparent'
              >
                {parents.map((val,index)=>
                  <option value={val._id} key={index}> {val.nom}  {val.prenoms}</option>
                )}
              </select>
            </label>
          </div>
          <div className="mt-8 flex justify-center">
            {chargement==false?
              <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-md px-5 py-3 transition-all duration-200 shadow'
                disabled={isSubmitting}
              >
                Inscrire
              </button>
              :
              <span className='inline-flex flex-row items-center space-x-2 justify-center px-3 py-2 text-md font-medium text-center text-black'>
                <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
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
