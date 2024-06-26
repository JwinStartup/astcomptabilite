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
    <div>
    <Entete />
     <div className="flex  items-center "  onClick={()=>navigate('/cp')} >
        <IoIosArrowDropleftCircle size={30} style={{paddingRigth:"5px"}} color="black" />
        <h5 className="text-xl font-bold ml-1 tracking-tight text-gray-900  ">Inscription élève  </h5>
    </div>
         <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex justify-center h-full items-center flex-col space-y- p-9 ' >
         
     <div className='flex flex-col '>
      <div className='flex flex-col mx-4 space-y-2'>
      <input {...register("nom")}   type='text' placeholder='Nom' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
      <input {...register("prenoms")}   type='text' placeholder='Prenoms' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
       <select {...register("genre")} defaultValue='Homme' className='outline-none w-[250px] border-b-2 py-1 text-lg'>
            <option>Homme</option>
            <option>Femme</option>
        </select>
      <input {...register("cel")}   type='text' placeholder='Cel' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
      <input {...register("ville")}   type='text' placeholder='ville' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
      <input {...register("commune")}   type='text' placeholder='commune' className='outline-none w-[250px] border-b-2 py-1 text-sm'/>
          <label> 
               {par.length!==0&& 
                  <div>{par.map((i)=>
                                     <span classeName='bg-gray-300 p-2 text-black font-bold'>
                                       {i.nom} {i.prenoms} </span>)}
                  </div>}
      Parent:
  <select {...register("parent")}
             defaultValue=" " className='outline-none w-[250px] border-b-2 py-1 text-sm'>
        {parents.map((val,index)=> <option className='' value={val._id} key={index}> {val.nom}  {val.prenoms}</option>)}
        </select> </label>
               
  <select {...register("classe")} defaultValue='Cp1' className='outline-none w-[250px] border-b-2 py-1 text-sm'>
            <option>Cp1 </option>
            <option>Cp2</option>
            <option>Ce1</option>
            <option>Ce2</option>
            <option>Cm1</option>
            <option>Cm2</option>
            <option>6eme</option>
           <option>5eme</option>
            <option>4eme</option>
            <option>3eme</option>
             <option>2ndA</option>
             <option>2ndC</option>
            <option>1ereC</option>
             <option>1ereD</option>
            <option>1ereA</option>
            <option>TleC</option>
             <option>TleD</option>
            <option>TleA</option>
        </select>
      <div> 
    
      <div  className="w-[250px] ">
         <label className="w-[250px] text-md font-medium ">Selectionner  des formateurs</label>    
       <ul className="px-3 pb-3 overflow-y-auto text-sm text-gray-700 w-[250px] ">
              {personnels.map((val,index)=><li>
        <div className="flex key={index} items-center p-2 rounded hover:bg-gray-100 ">
          <input id={index} 
                 type="checkbox" 
                 value={val._id} 
                 {...register("formateur")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "/>
                  <label htmlFor={index} className="w-full ms-2 text-sm font-medium text-gray-900 rounded "> 
                  {val.nom} {val.prenoms} - {val.discipline} 
                  </label>
        </div>
         </li>)}  
         </ul>        
      </div>
    
          
         </div>
     </div> 
     </div>
     
{chargement==false?<button type='submit' className='outline-none flex flex-row items-center justify-center   font-bold  text-lg  px-5 py-2.5 mr-2 mb-2'>
       <span>Inscrire</span>
      
      </button>:<span className='flex flex-row items-center space-x-2 justify-center inline-flex items-center px-3 py-2 text-md font-medium text-center text-black'>
       <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                 </svg>
              Loading...
           </span>}
    </form>




  </div>
  )
}
