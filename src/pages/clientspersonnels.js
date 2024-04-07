import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Entete from '../components/entete'
import { IoIosArrowDropleftCircle } from "react-icons/io";
export default function ClientsPersonnels() {
  const navigate= useNavigate() 
  return (
    <div>
        <Entete />
         <div className='w-[400px] flex border-b mx-2 py-2 justify-center items-center mt-5'>
          <IoIosArrowDropleftCircle size={30} color="red" onClick={()=>navigate('/')} />
           <Link to='/cp/ListeParent' className="tracking-tight w-full text-black font-semibold   text-center items-center border-r px-4 flex justify-center  cursor-pointer">
          Parents 
        </Link>
        <Link to='/cp/ListePersonnel' className="tracking-tight w-full text-black font-semibold   text-center items-center border-r px-4 flex justify-center  cursor-pointer">
          Personnels
        </Link>
        <Link to='/cp/ListeEnfant' className="tracking-tight w-full text-black font-semibold   text-center items-center border-r px-4 flex justify-center  cursor-pointer">
           Eleves 
        </Link>
      </div>
    </div>
  )
}
