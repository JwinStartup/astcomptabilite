import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Entete from '../components/entete'
import { comptabiliteActions } from '../reducer/comptabilite' 
import { useDispatch, useSelector } from 'react-redux'

export default function BilanCloture() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    
    useEffect(() => {
        console.log('useEffect déclenché avec id:', id)
        console.log('Type de id:', typeof id)
        console.log('comptabiliteActions.BilanById:', comptabiliteActions.BilanById)
        if (id) {
            console.log('Dispatching BilanById avec:', id)
            const action = comptabiliteActions.BilanById(id)
            console.log('Action créée:', action)
            dispatch(action)
        } else {
            console.log('id est falsy:', id)
        }
    }, [id, dispatch])

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
                    onClick={() => navigate('/')}
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-blue-100 text-blue-700 font-medium transition-all duration-200 flex items-center gap-2"
                >
                    ← Retour
                </button>
                <span className="text-xl font-bold text-blue-700 tracking-wide">Bilan Clôturé</span>
                <div className="w-20" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Titre */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
                        Bilan Clôturé - {bilan?.annee || 'N/A'}
                    </h1>
                    <div className="flex justify-center">
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                            ✅ Bilan clôturé
                        </div>
                    </div>
                </div>

                {/* Tableau responsive */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
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
                                <tr className="bg-blue-100 font-bold">
                                    <td className="py-4 px-6 text-blue-800">Total recettes</td>
                                    <td className="py-4 px-6 text-right text-blue-800">{bilan?.totalRecettes?.toLocaleString()} FCFA</td>
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
                                
                                <tr className="bg-red-100 font-bold">
                                    <td className="py-4 px-6 text-red-800">Total Passifs</td>
                                    <td className="py-4 px-6 text-right text-red-800">
                                        {
                                            ((bilan?.totalCharge || 0)).toLocaleString()
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
                                    <td className="py-4 px-6 text-green-800">Résultat net</td>
                                    <td className="py-4 px-6 text-right text-green-800 text-lg">{bilan?.beneficeNet?.toLocaleString()} FCFA</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="py-4 px-6 font-semibold text-gray-700">Commission cours à domicile</td>
                                    <td className="py-4 px-6 text-right font-medium">{bilan?.totalCommissionCoursDomicile?.toLocaleString()} FCFA</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
