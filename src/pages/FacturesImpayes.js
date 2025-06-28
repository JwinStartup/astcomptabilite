import React, { useEffect, useState,useMemo } from 'react'
import Entete from '../components/entete'
import { Link } from 'react-router-dom'
import Backdrop from '../components/backdrop'
import FormulaireCreerFacture from '../components/Formulaires/formulaireCreerFacture'
import VoirRecue from '../components/voirRecue.js'
import FormulairePayerEncoreFacture from '../components/Formulaires/formulairePayerEncoreFacture.js'
import FormulairePayerFacture from '../components/Formulaires/formulairePayerFacture.js'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import VoirFacture from '../components/Formulaires/voirFacture.js'
import PartagerFacture from '../components/Formulaires/partagerFacture.js'
import SupprimerFacture from '../components/Formulaires/supprimerFacture.js'
import {useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { RingLoader} from 'react-spinners';
import { comptabiliteActions } from '../reducer/comptabilite.js'
import { PropagateLoader } from 'react-spinners';
import { FaSearch,FaFileInvoice } from 'react-icons/fa';
import { FaPlusCircle } from "react-icons/fa"
import { MdOutlineArrowBackIos } from "react-icons/md";
const SetComponent = ({ p, retour, value }) => {
  // Empêche le scroll du body quand un modal est ouvert
  React.useEffect(() => {
    if (p) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [p]);

  // Affiche le composant modal toujours visible (position fixed, centré)
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 50,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  switch (p) {
    case 'CREER':
      return (
        <div style={modalStyle}>
          <Backdrop />
          <FormulaireCreerFacture retour={retour} />
        </div>
      );
    case 'PARTAGER':
      return (
        <div style={modalStyle}>
          <Backdrop />
          <PartagerFacture retour={retour} value={value} />
        </div>
      )
    case 'SUPPRIMER':
      return (
        <div style={modalStyle}>
          <Backdrop />
          <SupprimerFacture retour={retour} value={value} />
        </div>
      )
    case 'PAYERENCORE':
   return (
        <div style={modalStyle}>
          <Backdrop />
          <FormulairePayerEncoreFacture retour={retour} value={value} />
        </div> 
   )
    case 'VOIRRECUE':
      return (
        <div style={modalStyle}>
          <Backdrop />
          <VoirRecue retour={retour} value={value} />
        </div>
      )
    case 'PAYER':
      return (
        <div style={modalStyle}>
          <Backdrop />
          <FormulairePayerFacture retour={retour} value={value} />
        </div>
      )
    default:
      return null;
  }
}
export default function FacturesImpayes() {
  const dispatch = useDispatch()
  const [rub, setRub] = useState({nom:'',bol:false,value:null})
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState("all")
  const [filterType, setFilterType] = useState("all") // ajout du filtre type
  const navigate = useNavigate()
  
  useEffect(() => { 
    dispatch(comptabiliteActions.listeFacture())
  },[rub,dispatch])
  
  const {isLoader,factures} = useSelector((state)=> state.comptabiliteReducer);

  console.log('les factures dans pages:',factures)
  const filteredFactures = useMemo(() => {
    // Vérifie que factures est bien un tableau, sinon retourne un tableau vide
    if (!Array.isArray(factures)) return [];
    return factures.filter(facture => {
      // Filtre recherche
      const matchSearch = !searchTerm.trim() ? true : (
        (facture._id && facture._id.includes(searchTerm)) ||
        (facture.client?.nom && facture.client.nom.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      // Filtre par type
      const matchType = filterType === "all" ? true : facture.type === filterType;

      // Filtre par date
      const factureDate = new Date(facture.createdAt)
      const today = new Date()
      const isToday = factureDate.toDateString() === today.toDateString()
      const isThisMonth = factureDate.getMonth() === today.getMonth() && 
                         factureDate.getFullYear() === today.getFullYear()
      const isThisYear = factureDate.getFullYear() === today.getFullYear()

      if (filterDate === 'all' || !filterDate) {
        return matchSearch && matchType;
      }

      switch(filterDate) {
        case 'today': return matchSearch && matchType && isToday;
        case 'month': return matchSearch && matchType && isThisMonth;
        case 'year': return matchSearch && matchType && isThisYear;
        default: return matchSearch && matchType;
      }
    })
  }, [factures, searchTerm, filterDate, filterType])

  return (
    <div className='w-full'>
      {rub.bol!==false&&<SetComponent p={rub.nom} retour={()=>setRub({bol:false,nom:''})} value={rub.value} />}
      <Entete />
      {/* entete pour la page facture ameliorer le style */}
      <div className='w-full flex flex-col space-y-4'>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center  bg-transparent  px-3 py-2 md:px-6 md:py-4 mb-2">
          <div className="flex items-center gap-2 md:gap-3">
            <IoIosArrowDropleftCircle
              size={28}
              className="text-blue-600 cursor-pointer hover:text-blue-400 transition"
              onClick={() => window.history.back()}
              title="Retour"
            />
            <FaFileInvoice size={26} className="text-blue-600 drop-shadow" />
            <h5 className="text-lg md:text-xl font-bold tracking-tight text-blue-700 ml-1 md:ml-2 drop-shadow">
              Factures
            </h5>
          </div>
          <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-0">
            <Link
              to="/factures/nouveau"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-lg transition-colors text-sm md:text-base"
              style={{whiteSpace: 'nowrap'}}
            >
              <FaPlusCircle size={18} className="text-blue-700" />
              <span className="hidden sm:inline">Créer facture</span>
            </Link>
          </div>
        </div>
        <div className='flex flex-col justify-center  md:flex-row md:space-x-4 md:space-y-0 space-y-3 px-2 md:px-4'>
            <div className='w-full md:w-1/3 relative'>
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
              <input
                type="text"
                placeholder="Numero ou nom ..."
                className="w-full pl-10 pr-4 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='w-full md:w-1/4'>
              <select 
                className='w-full px-3 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base bg-white'
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value="all">Toutes les factures</option>
                <option value="today">Aujourd&apos;hui</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
            {/* Nouveau select pour le type de la facture */}
            <div className='w-full md:w-1/4'>
              <select
                className='w-full px-3 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base bg-white'
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <option value="all" defaultValue>Tout les types</option>
                <option value="impaye">Impayée</option>
                <option value="enpartie">Payée en partie</option>
                <option value="totalite">Payée en totalité</option>
              </select>
            </div>
        </div>

        {isLoader ? (
          <div className="flex flex-col gap-2 justify-center items-center ">
            { [1,2,3].map((i,j)=><div key={j} className="animate-pulse flex space-x-4 border rounded-md w-[250px] h-[200px] px-2 bg-gray-100">
            </div>)}
          </div>
        ) : (
          <div>
            {filteredFactures.length === 0 ? (
              <div className='w-full flex justify-center items-center py-10'>
                Aucune facture trouvée
              </div>
            ) : (
              <div className='flex flex-col md:flex-row md:flex-wrap md:justify-center gap-3 justify-center items-center'>
                {filteredFactures.map((value,index)=>
                  <VoirFacture 
                    key={index}
                    voirRecue={()=>setRub({nom:'VOIRRECUE',bol:true, value:value})}
                    supprimer={()=>setRub({nom:'SUPPRIMER',bol:true, value:value})} 
                    payer={()=>setRub({nom:'PAYER',bol:true, value:value})} 
                    payerEncore={()=>setRub({nom:'PAYERENCORE',bol:true, value:value})}
                    value={value}
                    partager={()=>setRub({nom:'PARTAGER',bol:true, value:value})} 
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
