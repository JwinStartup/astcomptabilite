import React, {useEffect,useState} from 'react'
import Entete from '../components/entete.js'
import FactureComponent from '../components/factureCompo.js'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5"
import { FaUserTie } from "react-icons/fa6"
import { useDispatch,useSelector } from 'react-redux';
import { RingLoader} from 'react-spinners';
import { comptabiliteActions } from '../reducer/comptabilite.js'
export default function Factures() {
   const dispatch=useDispatch()

useEffect(() => { 
   dispatch(comptabiliteActions.getAllCours())
   },[dispatch])



  const {isLoader,cours} = useSelector((state)=>{
    return state.comptabiliteReducer
   });

  const navigate=useNavigate()

  console.log('les factures et les reçues dans pages:',cours)
  
   return (
     <div className='w-full'>
       <Entete />
       <div className='w-full flex flex-col items-center mt-8'>
        {/* Header avec bouton à droite */}
        <div className="w-full max-w-5xl flex flex-row items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded-lg text-sm transition"
            >
              Retour
            </button>
            <h2 className="text-xl font-bold text-gray-700">Contrat</h2>
          </div>
          <Link
            to="/cd/nouveau"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors flex items-center justify-center"
          >
            + Créer contrat
          </Link>
        </div>
        {/* Liste de cartes responsive */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
          {isLoader ? (
            <div className="w-full flex justify-center items-center h-40">
              <RingLoader color={"green"} size={60} />
            </div>
          ) : (
            cours.length === 0 ? (
              <p className="text-center w-full text-gray-500 mt-10">Aucun contrat enregistré</p>
            ) : (
              cours.map((cours, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl shadow-lg p-5 flex flex-col gap-2 hover:shadow-2xl transition-all duration-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaUserTie className="text-purple-600" size={22} />
                    <span className="font-bold text-lg text-gray-800">{cours?.eleve?.nom} {cours?.eleve?.prenoms}</span>
                  </div>
                  <div className="text-sm text-gray-600"><span className="font-semibold">Année :</span> {cours?.anneeAcademique}</div>
                  <div className="text-sm text-gray-600"><span className="font-semibold">Parent :</span> {cours?.parent?.nom} {cours?.parent?.prenoms}</div>
                  <div className="text-sm text-gray-600"><span className="font-semibold">Formateur :</span> {cours?.formateur?.nom} {cours?.formateur?.prenoms}</div>
                  <div className="text-sm text-gray-600"><span className="font-semibold">Classe :</span> {cours?.classe}</div>
                  <div className="text-sm text-gray-600"><span className="font-semibold">Matières :</span> {Array.isArray(cours?.matieres) ? cours?.matieres.join(', ') : cours?.matieres}</div>
                  <div className="text-sm text-gray-600"><span className="font-semibold">Commissions :</span> {cours?.commission}</div>
                  <div className="text-sm text-gray-700 font-bold mt-2"><span className="text-purple-600">Prix :</span> {cours?.prix} FCFA</div>
                  
                  {/* Boutons d'action */}
                  <div className="flex flex-col gap-2 mt-3">
                    <Link
                      to={`/cd/modifier/${cours?._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold py-2 px-3 rounded shadow transition-colors text-center"
                    >
                      ✏️ Modifier contrat
                    </Link>
                    <button
                      onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) {
                          dispatch(comptabiliteActions.deleteCours(cours?._id))
                            .then(() => {
                              alert('Contrat supprimé avec succès !');
                              // Recharger la liste des cours
                              dispatch(comptabiliteActions.getAllCours());
                            })
                            .catch(() => {
                              alert('Erreur lors de la suppression du contrat');
                            });
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 px-3 rounded shadow transition-colors text-center"
                    >
                      🗑️ Supprimer contrat
                    </button>
                    {/* 
                      Le lien ci-dessous permet de créer une nouvelle facture pour le cours sélectionné.
                      - Le paramètre 't' est fixé à 'cd' pour indiquer qu'il s'agit d'un cours à domicile.
                      - Le paramètre 'cours' transmet l'identifiant unique du cours concerné.
                      Ainsi, la page de création de facture saura pour quel cours et quel type de prestation la facture doit être générée.
                    */}
                    <Link
                      to={`/factures/nouveau?parent=${cours?.parent?._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded shadow transition-colors text-center"
                    >
                      📄 Créer une facture
                    </Link>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
      <span className='flex text-xs mt-6 text-gray-400 w-full justify-center '>
         (c) 2024 Astraining  by jwin technology
       </span>
     </div>
   )
}
