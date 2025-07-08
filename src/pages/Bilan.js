import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import { comptabiliteActions } from '../reducer/comptabilite'
import { useDispatch, useSelector } from 'react-redux'
import { RingLoader } from 'react-spinners'
import Backdrop from '../components/backdrop'

const ANNEES = ['2024-2025','2025-2026','2026-2027']
const MOIS = [
  { long: 'janvier', short: 'Jan' },
  { long: 'février', short: 'Fév' },
  { long: 'mars', short: 'Mar' },
  { long: 'avril', short: 'Avr' },
  { long: 'mai', short: 'Mai' },
  { long: 'juin', short: 'Jui' },
  { long: 'juillet', short: 'Jul' },
  { long: 'août', short: 'Août' },
  { long: 'septembre', short: 'Sep' },
  { long: 'octobre', short: 'Oct' },
  { long: 'novembre', short: 'Nov' },
  { long: 'décembre', short: 'Déc' }
]

function getYearFromAnneeAndMois(annee, mois) {
  const [anneeDebut, anneeFin] = annee.split('-')
  const moisIndex = MOIS.findIndex(m => m.long === mois)
  if (moisIndex === -1) return anneeDebut // fallback
  if (moisIndex <= 6) {
    return anneeFin
  } else {
    return anneeDebut
  }
}

export default function Bilan() {
  const dispatch = useDispatch()
  const [annee, setAnnee] = useState(ANNEES[1])
  const [periode, setPeriode] = useState(MOIS[0].long)
  const navigate = useNavigate()
  useEffect(() => {
    const year = getYearFromAnneeAndMois(annee, periode)
    dispatch(comptabiliteActions.statistiqueFactures({periode:`${periode} ${year}`,anneeAcademique:`${annee}`}))
  }, [periode, annee, dispatch])

  const { isLoader, statistique } = useSelector((state) => {
    return state.comptabiliteReducer
  });

  const stats = statistique || {
    paye: { count: 0, montant: 0 },
    impaye: { count: 0, montant: 0 },
    enpartie: { count: 0, montant: 0 },
    totalResteApayer: 0,
    totalCommissionCoursDomicile: 0
  }

  return (
    <div className="bilan-page min-h-screen bg-gray-100">
      {/* Entête personnalisée */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <button
          className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
          onClick={() => navigate(-1)}
        >
          Retour
        </button>
        <span className="text-xl font-bold text-blue-700">Bilan</span>
        <div className="w-20" /> {/* Espace pour équilibrer le flex */}
      </div>
      {/* Deuxième entête */}
      <div className="bilan-header flex flex-col gap-4 bg-white p-6 rounded-xl mx-auto my-6 max-w-4xl shadow-md">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">Année académique :</span>
            <select
              value={annee}
              onChange={e => setAnnee(e.target.value)}
              className="px-4 py-1.5 rounded-lg border border-gray-300 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {ANNEES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {MOIS.map(mois => (
              <button
                key={mois.long}
                onClick={() => setPeriode(mois.long)}
                className={`px-4 py-1.5 rounded-full font-medium mb-1 transition-all
                  ${periode === mois.long
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}
                `}
              >
                {mois.short} <span className="text-xs text-gray-500">({annee})</span>
              </button>
            ))}
          </div>
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
          <div className="flex flex-wrap gap-8 justify-center mx-auto max-w-4xl">
            {/* Bloc Nombre de factures */}
            <div className="flex-1 min-w-[320px] bg-white rounded-xl p-6 shadow-md mb-6">
              <h3 className="text-blue-700 mb-4 text-lg font-semibold">Nombre de factures</h3>
              <div className="flex flex-col gap-3">
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
            <div className="flex-1 min-w-[320px] bg-white rounded-xl p-6 shadow-md mb-6">
              <h3 className="text-blue-700 mb-4 text-lg font-semibold">Montants totaux (FCFA)</h3>
              <div className="flex flex-col gap-3">
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
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}