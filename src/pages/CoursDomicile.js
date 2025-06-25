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
   dispatch(comptabiliteActions.listeFacture())
  },[])

useEffect(()=> {
  dispatch(comptabiliteActions.listeRecue())
},[])

  const {isLoader,factures,recues} = useSelector((state)=>{
    return state.comptabiliteReducer
   });

  const navigate=useNavigate()

  console.log('les factures et les reçues dans pages:',factures,recues)

  // Définir la liste des cours à domicile ici
  const coursDomicileList = [
    {
      anneeAcademique: "2024-2025",
      eleve: "680bcf5e070c78717d8784fc",
      parent: "Mme DAGRITCHE  Michelle",
      parentId: "680bcf07070c78717d8784f2",
      enseignant: "67e14db554b69eb6345c044f",
      classe: "4eme",
      commission: "500",
      prix: "5000",
      matieres: ["EDHC", "Mathématiques"]
    },
    {
      anneeAcademique: "2024-2025",
      eleve: "Aliou Sow",
      parent: "Maman Sow",
      parentId: "680bcf07070c78717d8784f2",
      enseignant: "Mme Ba",
      classe: "5ème",
      commission: "600",
      prix: "6000",
      matieres: ["Physique", "Chimie"]
    },
    {
      anneeAcademique: "2024-2025",
      eleve: "Aminata Fall",
      parent: "Papa Fall",
      parentId: "680bcf07070c78717d8784f2",
      enseignant: "M. Sy",
      classe: "4ème",
      commission: "550",
      prix: "5500",
      matieres: ["Français", "Histoire"]
    },
    {
      anneeAcademique: "2024-2025",
      eleve: "Moussa Kane",
      parent: "Papa Kane",
      parentId: "680bcf07070c78717d8784f2",
      enseignant: "Mme Diallo",
      classe: "3ème",
      commission: "650",
      prix: "6500",
      matieres: ["Anglais", "SVT"]
    },
    {
      anneeAcademique: "2024-2025",
      eleve: "Seynabou Gaye",
      parent: "Maman Gaye",
      parentId: "680bcf07070c78717d8784f2",
      enseignant: "M. Faye",
      classe: "Terminale",
      commission: "700",
      prix: "7000",
      matieres: ["Mathématiques", "Physique"]
    }
  ];

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
            <h2 className="text-xl font-bold text-gray-700">Cours à domicile</h2>
          </div>
          <Link
            to="/cd/nouveau"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors flex items-center justify-center"
          >
            + Créer cours
          </Link>
        </div>
        {/* Liste de cartes responsive */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
          {coursDomicileList.map((cours, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl shadow-lg p-5 flex flex-col gap-2 hover:shadow-2xl transition-all duration-200">
              <div className="flex items-center gap-2 mb-2">
                <FaUserTie className="text-purple-600" size={22} />
                <span className="font-bold text-lg text-gray-800">{cours.parent}</span>
              </div>
              <div className="text-sm text-gray-600"><span className="font-semibold">Année :</span> {cours.anneeAcademique}</div>
              <div className="text-sm text-gray-600"><span className="font-semibold">Élève :</span> {cours.eleve}</div>
              <div className="text-sm text-gray-600"><span className="font-semibold">Enseignant :</span> {cours.enseignant}</div>
              <div className="text-sm text-gray-600"><span className="font-semibold">Classe :</span> {cours.classe}</div>
              <div className="text-sm text-gray-600"><span className="font-semibold">Matières :</span> {Array.isArray(cours.matieres) ? cours.matieres.join(', ') : cours.matieres}</div>
              <div className="text-sm text-gray-700 font-bold mt-2"><span className="text-purple-600">Prix :</span> {cours.prix} FCFA</div>
              <Link
                to={`/factures/nouveau`}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded shadow transition-colors text-center"
              >
                Créer une facture
              </Link>
            </div>
          ))}
        </div>
      </div>
      <span className='text-xs mt-6 text-gray-400 w-full justify-center '>
         (c) 2024 Astraining  by jwin technology
       </span>
     </div>
   )
}
