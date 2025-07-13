import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Entete from '../components/entete'
import { comptabiliteActions } from '../reducer/comptabilite' 
import { useDispatch, useSelector } from 'react-redux'
// Mock data fetching functions (replace with real API calls)
/*
const fetchBilanData = async (anneeAcademique) => {
    // Simulated data
    return {
        paye: 12000,
        impaye: 3000,
        enpartie: 1500,
        commissionCoursDomicile: 800,
        charges: 4000,
    };
};
 paye: 0,
            impaye: 0,
            enpartie: 0,
            totalResteApayer: 0,
            totalCommissionCoursDomicile: 0,
            totalCharge:0
            
            facturesPaye
            facturesImpaye
            facturesEnpartie
            totalResteApayer
            totalCommissionCoursDomicile
            totalCharge
            totalRecettes
            beneficeNet
            annee: annee

const formatCurrency = (amount) =>
    amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
*/
export default function BilanAnneeAcademique() {
    const { anneeAcademique } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch()
useEffect(() => {
    console.log('useEffect déclenché avec anneeAcademique:', anneeAcademique)
    console.log('Type de anneeAcademique:', typeof anneeAcademique)
    console.log('comptabiliteActions.genererbilan:', comptabiliteActions.genererbilan)
    if (anneeAcademique) {
      console.log('Dispatching genererbilan avec:', anneeAcademique)
      const action = comptabiliteActions.genererbilan(anneeAcademique)
      console.log('Action créée:', action)
      dispatch(action)
    } else {
      console.log('anneeAcademique est falsy:', anneeAcademique)
    }
  }, [anneeAcademique, dispatch])

  const { isLoader, bilan } = useSelector((state) => {
    return state.comptabiliteReducer
  });
    if (isLoader) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold">Chargement...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
            <Entete/>
            
            {/* En-tête avec navigation */}
            <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm sticky top-0 z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-blue-100 text-blue-700 font-medium transition-all duration-200 flex items-center gap-2"
                >
                    ← Retour
                </button>
                <span className="text-xl font-bold text-blue-700 tracking-wide">Bilan Année Académique</span>
                <div className="w-20" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Titre et année */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
                        Bilan Année Académique {anneeAcademique}
                    </h1>
                    <div className="flex justify-center">
                        <button 
                            className='px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2'
                            onClick={() => {
                                // Action de clôture à implémenter
                                console.log('Clôture du bilan', anneeAcademique)
                            }}
                        >
                            📋 Clôturer le bilan
                        </button>
                    </div>
                </div>

                {/* Tableau responsive */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            {/* ...existing code... */}
                            <thead>
                                <tr>
                                    <th className="py-4 px-6 text-left bg-blue-50 font-bold text-blue-800" colSpan={2}>ACTIFS</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="py-4 px-6 font-semibold text-gray-700">Factures totalement payées</td>
                                    <td className="py-4 px-6 text-right font-medium">{bilan?.facturesPaye?.toLocaleString()} FCFA</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="py-4 px-6 font-semibold text-gray-700">Factures partiellement payées</td>
                                    <td className="py-4 px-6 text-right font-medium">{bilan?.facturesEnpartie?.toLocaleString()} FCFA</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="py-4 px-6 font-semibold text-gray-700">Factures impayées</td>
                                    <td className="py-4 px-6 text-right font-medium">{bilan?.facturesImpaye?.toLocaleString()} FCFA</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="py-4 px-6 font-semibold text-gray-700">Reste à payer</td>
                                    <td className="py-4 px-6 text-right font-medium">{bilan?.totalResteApayer?.toLocaleString()} FCFA</td>
                                </tr>
                                <tr className="bg-blue-100 font-bold">
                                    <td className="py-4 px-6 text-blue-800">Total Actifs</td>
                                    <td className="py-4 px-6 text-right text-blue-800">
                                        {
                                            ((bilan?.facturesPaye || 0) +
                                            (bilan?.facturesEnpartie || 0) +
                                            (bilan?.totalResteApayer || 0) +
                                            (bilan?.facturesImpaye || 0)).toLocaleString()
                                        } FCFA
                                    </td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th className="py-4 px-6 text-left bg-red-50 font-bold text-red-800" colSpan={2}>PASSIFS</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="py-4 px-6 font-semibold text-gray-700">Charges</td>
                                    <td className="py-4 px-6 text-right font-medium">{bilan?.totalCharge?.toLocaleString()} FCFA</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="py-4 px-6 font-semibold text-gray-700">Commission cours à domicile</td>
                                    <td className="py-4 px-6 text-right font-medium">{bilan?.totalCommissionCoursDomicile?.toLocaleString()} FCFA</td>
                                </tr>
                                <tr className="bg-red-100 font-bold">
                                    <td className="py-4 px-6 text-red-800">Total Passifs</td>
                                    <td className="py-4 px-6 text-right text-red-800">
                                        {
                                            ((bilan?.totalCharge || 0) +
                                            (bilan?.totalCommissionCoursDomicile || 0)).toLocaleString()
                                        } FCFA
                                    </td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th className="py-4 px-6 text-left bg-green-50 font-bold text-green-800" colSpan={2}>RÉSULTAT NET</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="bg-green-100 font-bold">
                                    <td className="py-4 px-6 text-green-800">Bénéfice net</td>
                                    <td className="py-4 px-6 text-right text-green-800 text-lg">{bilan?.beneficeNet?.toLocaleString()} FCFA</td>
                                </tr>
                                <tr className="bg-blue-100 font-bold">
                                    <td className="py-4 px-6 text-blue-800">Total recettes</td>
                                    <td className="py-4 px-6 text-right text-blue-800">{bilan?.totalRecettes?.toLocaleString()} FCFA</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}