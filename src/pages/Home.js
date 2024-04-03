import React, {useContext} from 'react'
import Entete from '../components/entete'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/authContext'
export default function Home() {
  const { user } = useContext(UserContext);
    console.log(user)
    return (
      <div>
        <Entete />
      <div className='w-full flex justify-center items-center mt-20 gap-4'>
        <Link to='/cp' className="w-52 h-52 bg-red-100 tracking-tight  text-black font-semibold rounded-3xl text-center items-center flex justify-center">
          clients & personnels
        </Link>
        <Link to='/factures' className="w-52 h-52 bg-red-100 tracking-tight  text-black font-semibold rounded-3xl text-center items-center flex justify-center">
          Factures & Reçues
        </Link>
        <Link to='/charges' className="w-52 h-52 bg-red-100 tracking-tight  text-black font-semibold rounded-3xl text-center items-center flex justify-center">
          Les charges
        </Link>
        <Link to='/bilan' className="w-52 h-52 bg-red-100 tracking-tight  text-black font-semibold rounded-3xl text-center items-center flex justify-center">
          Bilan financier
        </Link>
  {user.me?.role==='Administarteur'&&<Link to='/userAdmin' className="w-52 h-52 bg-red-100 tracking-tight  text-black font-semibold rounded-3xl text-center items-center flex justify-center">
          Utilisateur
        </Link>}
         </div></div>
  )
}   
