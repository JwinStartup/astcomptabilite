import React from 'react'
import { FaUserTie } from "react-icons/fa6"
export default function RecuesComponent({recue}){
  return(
    <div className='w-full max-w-sm border p-6 bg-white border-gray-100 shadow-xl rounded-2xl flex flex-col items-center space-y-4'>
      <div className='flex flex-col items-center'>
        <div className='font-bold text-xl text-blue-700 mb-2'>Reçu de paiement</div>
        <div className='text-sm text-gray-500 mb-2'>N° {recue?._id.slice(recue?._id.length - 6)}</div>
      </div>
      <div className='w-full bg-blue-50 rounded-lg p-3 mb-2'>
        <div className='font-medium text-gray-700'>Client : <span className='font-semibold'>{recue?.client?.nom} {recue?.client?.prenoms}</span></div>
        <div className='text-sm text-gray-500'>Téléphone : {recue?.client?.cel}</div>
      </div>
      <div className='w-full flex justify-between items-center bg-gray-50 rounded-lg p-3'>
        <div>
          <div className='text-xs text-gray-500'>Facture</div>
          <div className='font-semibold text-gray-700'>N° {recue?.facture?._id.slice(recue?.facture?._id.length - 6)}</div>
        </div>
        <div>
          <div className='text-xs text-gray-500'>Période</div>
          <div className='font-semibold text-gray-700'>{recue?.periodeAjouter}</div>
        </div>
      </div>
      <div className='w-full flex justify-between items-center bg-green-50 rounded-lg p-3'>
        <div>
          <div className='text-xs text-gray-500'>Montant payé</div>
          <div className='font-bold text-green-700 text-lg'>{recue?.montant} FCFA</div>
        </div>
        <div>
          <div className='text-xs text-gray-500'>Mode</div>
          <div className='font-semibold text-gray-700'>{recue?.modePaiement}</div>
        </div>
      </div>
      <div className='w-full bg-gray-50 rounded-lg p-3'>
        <div className='text-xs text-gray-500'>Référence paiement</div>
        <div className='font-semibold text-gray-700'>{recue?.refPaiement}</div>
      </div>
      <div className='flex flex-row justify-center gap-6 mt-4 w-full'>
        <button
          onClick={retour}
          type="button"
          className="text-blue-700 hover:text-blue-800 border-r font-medium text-sm px-5 py-2.5 text-center"
        >
          Retour
        </button>
      </div>
    </div>
  )
    }
