import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import Avatar from 'react-avatar'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import {useNavigate} from 'react-router-dom'





export default function ProfilPage() {
const dispatch = useDispatch()
 const navigate=useNavigate()


  return (
 <div className=' w-full'>
   <div className="flex  items-center "  onClick={()=>navigate('/')} >
        <IoIosArrowDropleftCircle size={30} color="black" />
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900  ">Profil  </h5>
    </div>
      <div className='flex  flex-col items-center justify-center '>
            <Avatar name={`${value.nom} ${value.prenoms}`}  size="100" round={true} /> 
           <div className='flex  text-lg font-bold tracking-wider text-center w-full justify-center items-center '>
            {value.nom}  {value.prenoms}
          </div>
           <div className='flex  text-md text-green-400   font-normal tracking-widest text-center w-full justify-center items-center '>
            Parent 
          </div>
           <div className='flex  text-md font-bold tracking-wider text-center w-full justify-center items-center '>
            {value.cel}  
          </div>
           <div className="flex justify-start text-red-300 font-medium text-sm items-center gap-1">{value.ville}<div className="w-2 h-2 rounded-full bg-black"/>{value.commune} </div>
       </div>

            <div>
              <p className="text-lg font-bold ml-1 tracking-tight text-gray-900  "> Bilan financier </p>
               <div>
           
               </div>
           </div>

           
    </div>
  )
}
