import React, {useContext} from 'react'
import Entete from '../components/entete'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/authContext'
import { GiCheckMark } from "react-icons/gi";
export default function Home() {
  const { user } = useContext(UserContext);
    console.log(user)
    return (
      <div className=''>
        <Entete />
      <div className='w-full flex flex-wrap  h-full  justify-center items-center mt-20 gap-4 '>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Facture</h5>
    </div>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> <GiCheckMark size={16} color="green" />Créer une facture</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><GiCheckMark size={16} color="green" />Modifier une facture</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><GiCheckMark size={16} color="green" />Payer une facture</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><GiCheckMark size={16} color="green" />Telecharger une facture</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><GiCheckMark size={16} color="green" />Suppprimer une facture</p>
    <Link to='/factures' className className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Commençer
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Link>
</div>
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
  {user?.me?.role==='Administrateur'&&<Link to='/userAdmin' className="w-52 h-52 bg-red-100 tracking-tight  text-black font-semibold rounded-3xl text-center items-center flex justify-center">
          Utilisateur
        </Link>}
         </div></div>
  )
}   
