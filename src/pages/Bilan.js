import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import { comptabiliteActions } from '../reducer/comptabilite'
import { useDispatch, useSelector } from 'react-redux'
import { RingLoader } from 'react-spinners'
import Backdrop from '../components/backdrop'
import { Link } from 'react-router-dom'

// const ANNEES = ['2025','2026','2027'] // Remplacé par input date
// const MOIS = [...] // Supprimé car remplacé par input month

export default function Bilan() {
  const dispatch = useDispatch()
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear().toString()
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const defaultValue = `${currentYear}-${currentMonth}`
  
  const [annee, setAnnee] = useState(currentYear)
  const [mois, setMois] = useState(currentMonth)
  const navigate = useNavigate()
  
  const handleMonthChange = (e) => {
    const [year, month] = e.target.value.split('-')
    setAnnee(year)
    setMois(month)
  }
  
  useEffect(() => {
    const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                       'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    const monthName = monthNames[parseInt(mois) - 1]
    dispatch(comptabiliteActions.statistiqueFactures({
      periode: `${monthName} ${annee}`,
      anneeAcademique: `${annee}`
    }))
  }, [mois, annee, dispatch])

  const { isLoader, statistique } = useSelector((state) => {
    return state.comptabiliteReducer
  });

  const stats = statistique || {
    paye: { count: 0, montant: 0 },
    impaye: { count: 0, montant: 0 },
    enpartie: { count: 0, montant: 0 },
    totalResteApayer: 0,
    totalCommissionCoursDomicile: 0,
    totalCharge: 0
  }

  return (
    <div className="bilan-page min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
     <Entete/>
      {/* Entête personnalisée */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-10">
        <button
          className="px-4 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-blue-700 font-medium transition"
          onClick={() => navigate(-1)}
        >
          Retour
        </button>
        <span className="text-2xl font-bold text-blue-700 tracking-wide drop-shadow-sm">Bilan</span>
        <div className="w-20" />
      </div>
      {/* Deuxième entête */}
      <div className="bilan-header bg-white p-6 rounded-2xl mx-auto my-6 max-w-5xl shadow-lg border border-blue-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <span className="font-semibold text-lg text-blue-900">Période :</span>
          <input
            type="month"
            defaultValue={defaultValue}
            onChange={handleMonthChange}
            className="px-4 py-2 rounded-lg border border-blue-200 text-base bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <button 
            className='px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200' 
            onClick={()=>navigate(`/bilan/${annee}`)}
          >
            📊 Clôturer le bilan {annee}
          </button>
        </div>
      </div>
      {/* Loader */}
      {isLoader ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <RingLoader color="#1976d2" />
        </div>
      ) : (
        // Corps de la page
        statistique === null ? (
          <div className="flex justify-center items-center min-h-[200px] text-gray-500 text-lg font-semibold">
            Aucune donnée disponible pour cette période.
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 justify-center mx-auto max-w-5xl w-full px-2">
            {/* Bloc Nombre de factures */}
            <div className="flex-1 min-w-[260px] bg-white rounded-2xl p-6 shadow-lg mb-6 border border-blue-100 flex flex-col">
              <h3 className="text-blue-700 mb-4 text-lg font-semibold text-center">Nombre de factures</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-green-500 inline-block"></span>
                  <span className="font-medium">Payé</span>
                  <span className="ml-auto font-bold text-green-600">{stats.paye.count}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-red-500 inline-block"></span>
                  <span className="font-medium">Impayé</span>
                  <span className="ml-auto font-bold text-red-600">{stats.impaye.count}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-orange-500 inline-block"></span>
                  <span className="font-medium">En partie</span>
                  <span className="ml-auto font-bold text-orange-500">{stats.enpartie.count}</span>
                </div>
              </div>
            </div>
            {/* Bloc Montants */}
            <div className="flex-1 min-w-[260px] bg-white rounded-2xl p-6 shadow-lg mb-6 border border-blue-100 flex flex-col">
              <h3 className="text-blue-700 mb-4 text-lg font-semibold text-center">Montants totaux (FCFA)</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-green-500 inline-block"></span>
                  <span className="font-medium">Payé</span>
                  <span className="ml-auto font-bold text-green-600">{stats.paye.montant.toLocaleString()} FCFA</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-red-500 inline-block"></span>
                  <span className="font-medium">Impayé</span>
                  <span className="ml-auto font-bold text-red-600">{stats.impaye.montant.toLocaleString()} FCFA</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-orange-500 inline-block"></span>
                  <span className="font-medium">En partie</span>
                  <span className="ml-auto font-bold text-orange-500">{stats.enpartie.montant.toLocaleString()} FCFA</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-blue-500 inline-block"></span>
                  <span className="font-medium">Reste à payer</span>
                  <span className="ml-auto font-bold text-blue-600">{stats.totalResteApayer.toLocaleString()} FCFA</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-purple-700 inline-block"></span>
                  <span className="font-medium">Commissions</span>
                  <span className="ml-auto font-bold text-purple-700">{stats.totalCommissionCoursDomicile.toLocaleString()} FCFA</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-gray-700 inline-block"></span>
                  <span className="font-medium">Total charges</span>
                  <span className="ml-auto font-bold text-gray-700">{stats.totalCharge} FCFA</span>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      {/* Footer */}
      <div className="w-full text-center text-xs text-gray-400 mt-6 mb-2">
        &copy; 2024 Astraining by jwin technology
      </div>
    </div>
  )
}