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
      eleve: "Fatou Diop",
      enseignant: "M. Ndiaye",
      parent: "Papa Diop",
      matiere: "Mathématiques",
      prix: "25 000 FCFA",
      inscritPar: "Agence Bouaké",
      classe: "6ème"
    },
    {
      eleve: "Aliou Sow",
      enseignant: "Mme Ba",
      parent: "Maman Sow",
      matiere: "Physique",
      prix: "30 000 FCFA",
      inscritPar: "Agence Abidjan",
      classe: "5ème"
    },
    {
      eleve: "Aminata Fall",
      enseignant: "M. Sy",
      parent: "Papa Fall",
      matiere: "Français",
      prix: "22 000 FCFA",
      inscritPar: "Agence San Pedro",
      classe: "4ème"
    },
    {
      eleve: "Moussa Kane",
      enseignant: "Mme Diallo",
      parent: "Papa Kane",
      matiere: "Anglais",
      prix: "28 000 FCFA",
      inscritPar: "Agence Bouaké",
      classe: "3ème"
    },
    {
      eleve: "Seynabou Gaye",
      enseignant: "M. Faye",
      parent: "Maman Gaye",
      matiere: "SVT",
      prix: "27 000 FCFA",
      inscritPar: "Agence Abidjan",
      classe: "Terminale"
    }
  ];

   return (
     <div className='w-full'>
       <Entete />
       <div className='w-full flex flex-col items-center mt-8'>
         <div className='w-full max-w-5xl flex flex-row gap-4 items-start'>
           {/* Bouton Créer cours à gauche */}
           <Link
             to="/cd/nouveau"
             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors flex items-center justify-center"
           >
             + Créer cours
           </Link>
           {/* Liste de cartes de cours à domicile */}
           <div className="flex flex-row gap-4 overflow-x-auto w-full py-2">
             {coursDomicileList.map((cours, idx) => (
               <div key={idx} className="min-w-[260px] max-w-xs bg-white border border-gray-200 rounded-2xl shadow-lg p-5 flex flex-col gap-2 hover:shadow-2xl transition-all duration-200">
                 <div className="flex items-center gap-2 mb-2">
                   <FaUserTie className="text-purple-600" size={22} />
                   <span className="font-bold text-lg text-gray-800">{cours.eleve}</span>
                 </div>
                 <div className="text-sm text-gray-600"><span className="font-semibold">Enseignant :</span> {cours.enseignant}</div>
                 <div className="text-sm text-gray-600"><span className="font-semibold">Parent :</span> {cours.parent}</div>
                 <div className="text-sm text-gray-600"><span className="font-semibold">Classe :</span> {cours.classe}</div>
                 <div className="text-sm text-gray-600"><span className="font-semibold">Matière :</span> {cours.matiere}</div>
                 <div className="text-sm text-gray-600"><span className="font-semibold">Inscrit par :</span> {cours.inscritPar}</div>
                 <div className="text-sm text-gray-700 font-bold mt-2"><span className="text-purple-600">Prix :</span> {cours.prix}</div>
                 <Link
                   to={`/cd/facture/nouveau?eleve=${encodeURIComponent(cours.eleve)}`}
                   className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded shadow transition-colors text-center"
                 >
                   Créer une facture
                 </Link>
               </div>
             ))}
           </div>
         </div>
       </div>
       <span className='text-xs mt-6 text-gray-400 w-full justify-center '>
         (c) 2024 Astraining  by jwin technology
       </span>
     </div>
   )
}
