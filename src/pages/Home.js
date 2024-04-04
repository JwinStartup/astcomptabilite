import React, {useContext} from 'react'
import Entete from '../components/entete'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/authContext'
import { GiCheckMark } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa";
export default function Home() {
  const { user } = useContext(UserContext);
    console.log(user)
    return (
      <div className=''>
        <Entete />
      <div className='w-full flex flex-wrap  h-full  justify-center items-center mt-20 gap-4 '>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center mb-3">
        <FaFileInvoice  size={40} color="green"/>
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900 dark:text-white">Facture & Reçue </h5>
    </div>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg  "> <GiCheckMark size={18} color="green" />Créer une facture ou reçue</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Modifier une facture ou reçue</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Payer une facture</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Telecharger une facture ou reçue</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Suppprimer une facture</p>
    <Link to='/factures' className className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Commençer
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Link>
</div>


       <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center mb-3">
        <FaFileInvoice  size={40} color="green"/>
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900 dark:text-white">Parents & Personnels </h5>
    </div>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg  "> <GiCheckMark size={18} color="green" />Inscrire les parents , élèves et personnels</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Modifier les  informations</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Ajouter le montant de la formation</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Suppprimer </p>
    <Link to='/cp' className className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800">
        voir 
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Link>
</div>

       <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center mb-3">
        <FaFileInvoice  size={40} color="green"/>
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900 dark:text-white">Parents & Personnels </h5>
    </div>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg  "> <GiCheckMark size={18} color="green" />Enregistrer payement mensuel du personnel </p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Enregistrer les frais de  consommation eau-courant-internet du mois</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Enregistrer les frais du loyer du mois</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />modifier les charges </p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />supprimer les charges </p>
    <Link to='/charges' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800">
        voir 
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Link>
</div>
       <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center mb-3">
        <FaFileInvoice  size={40} color="green"/>
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900 dark:text-white"> Bilan financier </h5>
    </div>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg  "> <GiCheckMark size={18} color="green" />Suivre l'evolution des recettes  et les charges mensuels</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Voir la liste les bilan mensuel</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Cloturer le bilan du mois </p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Voir le resultat à la cloture de chaque bilan</p>
    <Link to='/bilan' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800">
        voir 
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Link>
</div>
     {user?.me?.role==='Administrateur'&&  <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center mb-3">
        <FaFileInvoice  size={40} color="green"/>
        <h5 className="text-2xl font-bold ml-1 tracking-tight text-gray-900 dark:text-white"> Bilan financier </h5>
    </div>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg  "> <GiCheckMark size={18} color="green" />Inscrire les administateurs et directeurs</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />Voir la liste des utilisateurs</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />modifier les utilisateurs </p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center text-lg"><GiCheckMark size={18} color="green" />supprimer les utilisateurs</p>
    <Link to='/userAdmin' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800">
        voir 
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Link>
</div>}
       
         </div></div>
  )
}   
