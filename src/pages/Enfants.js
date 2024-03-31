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
      Formateur:
     <select {...register("Formateur")}
              onChange={(e)=> console.log(e.target.value)} 
             defaultValue=" " className='outline-none w-[400px] border-b-2 py-1 text-lg'>
             {personnels.map((val,index)=> <option 
                                      value={val._id}  
                                      key={index}>
                                      {val.nom}  {val.prenoms}
                                     </option>)}
        </select>  </label>
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
            <option>cp1 </option>
            <option>cp2</option>
            <option>ce1</option>
            <option>ce2</option>
            <option>cm1</option>
            <option>cm2</option>
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
     </div> 
     </div>
     
<button type='submit' className='outline-none flex flex-row items-center justify-center space-x-2  text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2'>
       <span>   S'inscrire</span>
      </button>
    </form>




  </div>
  )
}
