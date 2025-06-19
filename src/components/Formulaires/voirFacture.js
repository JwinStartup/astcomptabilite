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





export default function VoirFacture({payer,voirRecue,value,modifier,partager,supprimer}) {
const dispatch = useDispatch()
console.log(value)
  return (
    <div className='relative mx-3 bg-white shadow-lg w-[320px] border p-4 rounded-xl hover:shadow-xl transition-all duration-300'>
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

        <div className='bg-gray-50 p-3 rounded-lg'>
          <div className='text-sm text-gray-500 mb-1'>Élève</div>
          <div className='font-medium text-gray-800'>{value?.eleve?.nom || "Akou eleva"}</div>
          <div className='text-sm text-gray-600'>{value?.eleve?.classe || "Tle D"}</div>
        </div>

        <div className='flex justify-between items-center bg-blue-50 p-3 rounded-lg'>
          <div>
            <div className='text-sm text-gray-500'>Montant</div>
            <div className='font-bold text-lg text-blue-600'>{value?.montant} FCFA</div>
          </div>
          <div>
            <div className='text-sm text-gray-500'>Période</div>
            <div className='font-medium text-gray-700'>{value?.periodeAjouter}</div>
          </div>
        </div>
      </div>

      {/* Tableau des détails */}
      <div className='mt-4 overflow-hidden rounded-lg border'>
        <table className="w-full">
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Désignation</th>
              <th className='py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Montant</th>
              <th className='py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white'>
              <td className='py-3 px-3 text-sm font-medium text-gray-700'>Cours à domicile</td>
              <td className='py-3 px-3 text-sm text-gray-600'>{value?.montant}</td>
              <td className='py-3 px-3'>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  value?.type === 'impaye' 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-green-100 text-green-600'
                }`}>
                  {value?.type}
                </span>
              </td>
            </tr>
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
        {value?.type === 'impaye' && (
          <button onClick={()=>modifier()} 
            className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm">
            Modifier
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

