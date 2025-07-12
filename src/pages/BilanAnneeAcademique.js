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


const formatCurrency = (amount) =>
    amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
*/
export default function BilanAnneeAcademique() {
    const { anneeAcademique } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch()
useEffect(() => {
    dispatch(comptabiliteActions.genererbilan(`${anneeAcademique}`))
  }, [anneeAcademique])

  const { isLoader, bilan } = useSelector((state) => {
    return state.comptabiliteReducer
  });
  console.log(bilan)
    if (isLoader) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold">Chargement...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
                 <Entete/>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Retour
                </button>
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Bilan Année Académique {anneeAcademique}
                </h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead>
                            <tr>
                                <th className="py-3 px-4 text-left bg-blue-50" colSpan={2}>ACTIFS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 px-4 font-semibold">Factures totalement payées</td>
                                <td className="py-3 px-4 text-right">{bilan.paye}</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-semibold">Factures partiellement payées</td>
                                <td className="py-3 px-4 text-right">{bilan.enpartie}</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-semibold">facture impayée</td>
                                <td className="py-3 px-4 text-right">{bilan.impaye}</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-semibold">Reste à payer</td>
                                <td className="py-3 px-4 text-right">{bilan.totalResteApayer}</td>
                            </tr>
                            <tr className="bg-gray-100 font-bold">
                                <td className="py-3 px-4">Total Actifs</td>
                                <td className="py-3 px-4 text-right">
                                    {
                                        bilan.paye +
                                        bilan.enpartie +
                                        bilan.totalResteApayer +
                                        bilan.impaye
                                    }
                                </td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th className="py-3 px-4 text-left bg-blue-50" colSpan={2}>PASSIFS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 px-4 font-semibold">Charges</td>
                                <td className="py-3 px-4 text-right">{bilan.charges}</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-semibold">Commission cours à domicile</td>
                                <td className="py-3 px-4 text-right">{bilan.commissionCoursDomicile}</td>
                            </tr>
                            <tr className="bg-gray-100 font-bold">
                                <td className="py-3 px-4">Total Passifs</td>
                                <td className="py-3 px-4 text-right">
                                    {
                                        bilan.charges +
                                        bilan.commissionCoursDomicile
                                    }
                                </td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th className="py-3 px-4 text-left bg-blue-50" colSpan={2}>RÉSULTAT NET</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-green-50 font-bold">
                                <td className="py-3 px-4">Résultat net</td>
                                <td className="py-3 px-4 text-right">
                                    {
                                        (bilan.paye +
                                         bilan.enpartie +
                                         bilan.totalResteApayer+
                                         bilan.impaye) -
                                        (bilan.charges + bilan.commissionCoursDomicile)
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}