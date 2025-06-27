import React,{useEffect,useState,} from 'react'
import {PDFfacture} from '../PDFfacture'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../../reducer/comptabilite.js'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment"
import "moment/min/locales"
import { FaFileInvoice } from "react-icons/fa";

import {useNavigate} from 'react-router-dom'





export default function VoirFacture({payer,voirRecue,value,partager,supprimer}) {
const dispatch = useDispatch()
  return (
    <div className='relative mx-1 bg-white shadow-lg w-[320px] border p-4 rounded-xl hover:shadow-xl transition-all duration-300'>
      {/* En-tête de la facture */}
      <div className='absolute right-2 top-2'>    
        {value?.type === 'impaye' && 
          <AiFillCloseCircle 
            className="hover:text-red-500 transition-colors" 
            color="gray" 
            size={25} 
            onClick={()=>supprimer()} 
          />}
      </div>

      <div className='flex justify-between items-center border-b pb-3'> 
        <div className='flex items-center space-x-2'>
          <div className='p-2 bg-blue-100 rounded-lg'>
            <FaFileInvoice size={20} className="text-blue-600" />
          </div>
          <div className='font-bold text-xl text-gray-800'>Facture</div>
        </div>
        <div className='px-3 py-1 bg-green-100 rounded-full'>
          <span className='font-semibold text-green-600'>N° {value?._id.slice(value?._id.length-3)}</span>
        </div>
      </div>

      {/* Informations client */}
      <div className='mt-4 space-y-3'>
        <div className='bg-gray-50 p-3 rounded-lg'>
          <div className='text-sm text-gray-500 mb-1'>Parent</div>
          <div className='font-medium text-gray-800'>{value?.client?.nom} {value?.client?.prenoms}</div>
          <div className='text-sm text-gray-600'>{value?.client?.cel}</div>
        </div>
        <div className='flex justify-between items-center bg-blue-50 p-3 rounded-lg'>
          <div>
            <div className='text-sm text-gray-500'>Montant total</div>
            <div className='font-bold text-lg text-blue-600'>{value?.montant} FCFA</div>
          </div>
          <div>
            <div className='text-sm text-gray-500'>Mois</div>
            <div className='font-medium text-gray-700'>{value?.periode}</div>
          </div>
        </div>
      </div>

      {/* Statut déplacé au-dessus du tableau */}
      <div className='mb-3 flex flex-col items-end'>
        <div className='flex items-center gap-2'>
          <span className='text-gray-500 font-medium text-sm'>Statut :</span>
          <span className={`px-3 py-1.5 text-sm font-semibold rounded-full
            ${value.type === 'impaye' ? 'bg-red-100 text-red-600' : ''}
            ${value.type === 'paye' ? 'bg-green-100 text-green-600' : ''}
            ${value.type === 'enpartie' ? 'bg-yellow-100 text-yellow-700' : ''}
          `}>
            {value.type === 'impaye' && 'Impayé'}
            {value.type === 'paye' && 'Payé'}
            {value.type === 'enpartie' && 'En partie'}
          </span>
        </div>
        {value.type === 'enpartie' && (
          <div className="flex flex-col items-end mt-2 w-full">
            <div className="flex justify-between w-full">
              <span className="text-xs text-gray-500 font-medium">Montant payé :</span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 rounded px-2 py-0.5 ml-2">
                {value?.montantPaye || 0} FCFA
              </span>
            </div>
            <div className="flex justify-between w-full mt-1">
              <span className="text-xs text-gray-500 font-medium">Reste à payer :</span>
              <span className="text-xs font-semibold text-red-600 bg-red-50 rounded px-2 py-0.5 ml-2">
                {value?.resteAPayer || 0} FCFA
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Tableau des détails */}
      <div className='mt-4 overflow-hidden rounded-lg border'>
        <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="py-2 px-2 text-left">Année</th>
                    <th className="py-2 px-2 text-left">Elève</th>
                    <th className="py-2 px-2 text-left">Classe</th>
                    <th className="py-2 px-2 text-left">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {value.cours.map((cours, i) => (
                    <tr key={cours._id} className={i%2===0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-2 px-2">{cours.anneeAcademique}</td>
                      <td className="py-2 px-2">{cours.eleve.nom} {cours.eleve.prenoms}</td>
                      <td className="py-2 px-2">{cours.classe}</td>
                      <td className="py-2 px-2">{cours.prix || 0} FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
      </div>

      {/* Date et boutons */}
      <div className='text-right mt-3 text-xs text-gray-400'>
        {moment(`${value?.updatedAt}`).locale('fr').fromNow()}
      </div>

      <div className='mt-4 flex justify-center gap-2 border-t pt-4'>
        {value?.type === 'impaye' ? (
          <button onClick={()=>payer()} 
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm">
            Payer
          </button>
        ) : (
          <button onClick={()=>voirRecue()} 
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm">
            Voir reçu
          </button>
        )}
       
        <button onClick={()=>partager()} 
          className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm">
          Partager
        </button>
      </div>
    </div>
  )
}

