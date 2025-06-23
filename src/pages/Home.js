import React, {useContext} from 'react'
import Entete from '../components/entete'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/authContext'
import { GiCheckMark } from "react-icons/gi";
import { FaFileInvoice, FaIndent } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100'>
      <Entete />
      <div className='w-full flex flex-col items-center mt-8'>
        <h2 className="text-3xl font-bold text-blue-800 mb-8 tracking-tight">Bienvenue sur votre espace de gestion</h2>
        <div className='w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {/* Facture & Reçue */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col items-start">
            <div className="flex items-center mb-4">
              <FaFileInvoice size={32} className="text-blue-600" />
              <h5 className="text-xl font-bold ml-3 tracking-tight text-gray-900">Facture & Reçue</h5>
            </div>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-green-500 mr-2" />Créer une facture ou un reçu</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-green-500 mr-2" />Modifier une facture ou un reçu</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-green-500 mr-2" />Payer une facture</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-green-500 mr-2" />Télécharger une facture ou un reçu</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-green-500 mr-2" />Supprimer une facture</li>
            </ul>
            <Link to='/factures' className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Commencer
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 14 10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Link>
          </div>
          {/* Parents & Personnels */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col items-start">
            <div className="flex items-center mb-4">
              <FaUsers size={32} className="text-green-600" />
              <h5 className="text-xl font-bold ml-3 tracking-tight text-gray-900">Parents & Personnels</h5>
            </div>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-gray-500 mr-2" />Inscrire les parents et les personnels</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-gray-500 mr-2" />Inscrire les élèves</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-gray-500 mr-2" />Voir et modifier les informations</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-gray-500 mr-2" />Ajouter le montant de la formation</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-gray-500 mr-2" />Supprimer</li>
            </ul>
            <Link to='/cp' className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-700 transition-colors">
              Commencer
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 14 10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Link>
          </div>
          {/* Charges */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col items-start">
            <div className="flex items-center mb-4">
              <FaIndent size={32} className="text-[#764929]" />
              <h5 className="text-xl font-bold ml-3 tracking-tight text-gray-900">Charges</h5>
            </div>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-blue-600 mr-2" />Enregistrer les salaires</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-blue-600 mr-2" />Enregistrer les frais du loyer</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-blue-600 mr-2" />Enregistrer les autres charges</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-blue-600 mr-2" />Modifier les charges</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-blue-600 mr-2" />Supprimer les charges</li>
            </ul>
            <Link to='/charges' className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-[#764929] rounded-lg hover:bg-[#5a3720] transition-colors">
              Commencer
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 14 10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Link>
          </div>
          {/* Bilan financier */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col items-start">
            <div className="flex items-center mb-4">
              <BsFileEarmarkSpreadsheetFill size={32} className="text-[#f01e2c]" />
              <h5 className="text-xl font-bold ml-3 tracking-tight text-gray-900">Bilan financier</h5>
            </div>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-[#764929] mr-2" />Suivre l'évolution des recettes</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-[#764929] mr-2" />Suivre l'évolution des charges</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-[#764929] mr-2" />Voir la liste des bilans</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-[#764929] mr-2" />Clôturer les bilans</li>
              <li className="flex items-center text-base text-gray-700"><GiCheckMark size={18} className="text-[#764929] mr-2" />Voir le résultat net</li>
            </ul>
            <Link to='/profil' className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-[#f01e2c] rounded-lg hover:bg-red-700 transition-colors">
              Commencer
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 14 10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Link>
          </div>
          {/* Cours à domicile */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col items-start">
            <div className="flex items-center mb-4">
              <FaUsers size={32} className="text-purple-600" />
              <h5 className="text-xl font-bold ml-3 tracking-tight text-gray-900">Cours à domicile</h5>
            </div>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center text-base text-gray-700">
                <GiCheckMark size={18} className="text-purple-500 mr-2" />Inscription des élèves
              </li>
              <li className="flex items-center text-base text-gray-700">
                <GiCheckMark size={18} className="text-purple-500 mr-2" />Modification des informations
              </li>
              <li className="flex items-center text-base text-gray-700">
                <GiCheckMark size={18} className="text-purple-500 mr-2" />Supprimer les cours à domicile
              </li>
            </ul>
            <Link to='/cd' className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
              Commencer
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 14 10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <span className='text-xs mt-6 text-gray-400 w-full justify-center '>
           (c) 2024 Astraining  by jwin technology
        </span> 
    </div>
  )
}
