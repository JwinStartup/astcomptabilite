import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { userActions } from '../reducer/user';


export default function CreerEleve({retour,value}) {
 const [par,setPar] = useState([])
  const { register, handleSubmit,
         formState:{isSubmitting}
     } = useForm(
   );
const modifier=()=>{
  console.log('modifier')
}
const supprimer=()=>{
  console.log('supprimer')
}
 const dispatch =useDispatch()
const onSubmit = (data) => {
 console.log(data)
dispatch(userActions.inscriptionEnfant(data)).then(()=>{
  retour()
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
<form className='w-[300px] onSubmit={handleSubmit(onSubmit)}  border p-3 bg-white border-gray-100 shadow-md rounded-lg   z-10 absolute top-[100px] left-[30px]' >
     <div className='flex flex-col '>
   <div className='absolute right-0 top-0 m-1 cursor-pointer  z-50 '>    
            <AiFillCloseCircle color="gray" size={25} onClick={()=>retour()} />
           </div>
   <p className='text-2xl font-semibold text-black tracking-wider mb-3'>Enfant</p>             
      <div className='flex flex-col mx-4 space-y-2'>
      <input {...register("nom")}   type='text' placeholder='Nom' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("prenoms")}   type='text' placeholder='Prenoms' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("cel")}   type='text' placeholder='Cel' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("ville")}   type='text' placeholder='ville' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
      <input {...register("commune")}   type='text' placeholder='commune' className='outline-none w-[250px] border-b-2 py-1 text-lg'/>
          <label> 
               {par.length!==0&& 
                  <div>{par.map((i)=>
                                     <span classeName='bg-gray-300 p-2 text-black font-bold'>
                                       {i.nom} {i.prenoms} </span>)}
                  </div>}
      Parent:
  <select {...register("parent")}
             defaultValue=" " className='outline-none w-[250px] border-b-2 py-1 text-lg'>
        {parents.map((val,index)=> <option className='' value={val._id} key={index}> {val.nom}  {val.prenoms}</option>)}
        </select> </label>
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
     <div className='flex flex-col items-center my-2  w-full'>
      <button type='submit' className=" text-green-700  font-medium  text-sm px-3 py-2 text-center inline-flex items-center">
                   {isSubmitting===false? <span>  Inscrire</span>: <span> Inscrire ...</span>}
      </button>
     </div>
                    
    </form>
  )
}
