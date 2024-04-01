import React, {useEffect,useState} from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';
export default function Enfants() {
 const [par,setPar] = useState([])
  const navigate=useNavigate()
  const { register, handleSubmit,
  } = useForm(
);
const dispatch =useDispatch()
const onSubmit = (data) => {
 console.log(data)
 //setLoading(true)
dispatch(userActions.inscriptionEnfant(data)).then(()=>{
  navigate('/cp/ListeEnfant')
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
    <div className='flex items-cennter justify-between mx-5 w-[1150px]'>
    <button className='ml-10 bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={()=>navigate("/cp/ListePersonnel")} > retour</button>

              <p className=' mb-3 p-0 ml-5  tracking-tight text-2xl text-black font-bold'>Inscription Ennfant</p>
             
          </div>
         <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex justify-center h-full items-center flex-col space-y-4 p-9 ' >
         
     <div className='flex flex-col '>
   <p className='text-2xl font-semibold text-black tracking-wider mb-3'>Enfant</p>             
      <div className='flex flex-col mx-4 space-y-4'>
      <input {...register("nom")}   type='text' placeholder='Nom' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("prenoms")}   type='text' placeholder='Prenoms' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("cel")}   type='text' placeholder='Cel' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("ville")}   type='text' placeholder='ville' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
      <input {...register("commune")}   type='text' placeholder='commune' className='outline-none w-[400px] border-b-2 py-1 text-lg'/>
          <label> 
               {par.length!==0&& 
                  <div>{par.map((i)=>
                                     <span classeName='bg-gray-300 p-2 text-black font-bold'>
                                       {i.nom} {i.prenoms} </span>)}
                  </div>}
      Parent:
  <select {...register("parent")}
             defaultValue=" " className='outline-none w-[400px] border-b-2 py-1 text-lg'>
        {parents.map((val,index)=> <option className='' value={val._id} key={index}> {val.nom}  {val.prenoms}</option>)}
        </select> </label>
               
  <select {...register("classe")} defaultValue='Science' className='outline-none w-[400px] border-b-2 py-1 text-lg'>
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
    <button 
              id="dropdownSearchButton" 
              data-dropdown-toggle="dropdownSearch" 
               className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-300 rounded-lg"
               type="button">Selctionner formateur
               <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
               </svg>
               </button>
      <div id="dropdownSearch" className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
       <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 " aria-labelledby="dropdownSearchButton">
              {personnels.map((val,index)=><li>
        <div className="flex key={index} items-center p-2 rounded hover:bg-gray-100 ">
          <input id={index} 
                 type="checkbox" 
                 value={val._id} 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "/>
                  <label htmlFor={index} className="w-full ms-2 text-sm font-medium text-gray-900 rounded "> 
                  {va.nom} {val.prenoms} - {val.discipline} 
                  </label>
        </div>
         </li>)}  
         </ul>        
      </div>
    
          
         </div>
     </div> 
     </div>
     
<button type='submit' className='outline-none flex flex-row items-center justify-center space-x-2  text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2'>
       <span>   S'inscrire</span>
      </button>
    </form>




  </div>
  )
}
