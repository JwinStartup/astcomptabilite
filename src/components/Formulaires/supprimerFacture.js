import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';

export default function SupprimerFacture({ retour, value }) {
  const dispatch = useDispatch()
  const [chargement, setChargement] = useState(false)
  const supprimer = () => {
    setChargement(true)
    dispatch(comptabiliteActions.supprimerFacture(value._id)).then(() => {
      setChargement(false)
      retour()
    })
  }
  return (
    <div className='w-full max-w-xs mx-auto border p-6 bg-white border-gray-100 shadow-xl rounded-2xl z-50
      absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-6'>
      <div className='flex flex-col items-center'>
        <div className='w-14 h-14 flex items-center justify-center rounded-full bg-red-100 mb-2'>
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className='font-bold text-lg text-red-600 text-center'>Supprimer la facture</div>
        <p className='font-medium text-sm text-center text-gray-700 mt-2'>
          Voulez-vous vraiment supprimer la facture
          <span className='text-green-500 font-bold px-1'>N° {value._id.slice(value._id.length - 6)}</span> ?
        </p>
      </div>
      <div className='flex flex-row justify-center gap-6 w-full mt-2'>
        <button
          onClick={() => retour()}
          type="button"
          className="text-blue-700 hover:text-blue-800 border-r font-medium text-sm px-5 py-2.5 text-center"
        >
          Retour
        </button>
        {chargement === false ? (
          <button
            type="button"
            onClick={() => supprimer()}
            className="font-medium text-md text-white bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-lg shadow"
          >
            Supprimer
          </button>
        ) : (
          <span className='flex flex-row items-center space-x-2 justify-center px-3 py-2 text-md font-medium text-center text-red-600'>
            <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            Suppression...
          </span>
        )}
      </div>
    </div>
  )
}
