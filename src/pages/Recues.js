import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import {useNavigate} from 'react-router-dom'
import Backdrop from '../components/backdrop'
import { useDispatch, useSelector } from 'react-redux'
import ComposantRecue from '../components/ComposantRecue.js'
import { comptabiliteActions } from '../reducer/comptabilite.js'
import { RingLoader } from 'react-spinners'
import { useParams } from 'react-router-dom'

export default function Recues() {
 const dispatch = useDispatch()
  const navigate=useNavigate()
  
  //on va utiliser useParams pour récupérer l'id de la facture depuis l'url
  const {id} = useParams()
  
  useEffect(() => { 
    dispatch(comptabiliteActions.getFactureById(id))
  },[])
  
  const {isLoader,recues,facture} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
   console.log('facture:',facture)
  return (
    <div>
              {/* Entête de la page */}
      <Entete />
      <div className='flex flex-col items-center justify-start mt-10'>
        {/* ajouter retour*/}
        <button 
          onClick={() => navigate(-1)} 
          className='mb-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          {/* logo chevrons gauche de react-icons */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>Reçues de la facture N°{facture?._id}</h1>
    </div>

     {/* Liste des reçues de la facture , on utilisera map pour afficher chaque reçue , on utilisera le composant VoirRecue pour afficher chaque reçue */}
        <div className='w-full max-w-4xl mx-auto px-4'>
          {isLoader ? (
            <div className='flex items-center justify-center h-64'>
              <RingLoader color="#3b82f6" size={50} />
            </div>
          ) : (
            <div className='space-y-4'>
              {facture?.paiement?.length > 0 ? (
                facture.paiement.map((recue, index) => (
                  <ComposantRecue key={index} value={recue} client={facture?.client} />
                ))
              ) : (
                <div className='text-center text-gray-500'>Aucune reçue trouvée</div>
              )}
              </div>
            )}
            </div>
    </div>
    )
  }