import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Mock data fetching functions (replace with real API calls)
const fetchBilanData = async (anneeAcademique) => {
    // Simulated data
    return {
        facturesTotalementPaye: 12000,
        facturesImpayes: 3000,
        facturesPartiellementPaye: 1500,
        commissionCoursDomicile: 800,
        charges: 4000,
    };
};

const formatCurrency = (amount) =>
    amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

export default function BilanAnneeAcademique() {
    const { anneeAcademique } = useParams();
    const navigate = useNavigate();
    const [bilan, setBilan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBilanData(anneeAcademique).then((data) => {
            setBilan(data);
            setLoading(false);
        });
    }, [anneeAcademique]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold">Chargement...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
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
                                <td className="py-3 px-4 text-right">{formatCurrency(bilan.facturesTotalementPaye)}</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-semibold">Factures partiellement payées</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(bilan.facturesPartiellementPaye)}</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-semibold">Reste à payer</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(bilan.facturesImpayes)}</td>
                            </tr>
                            <tr className="bg-gray-100 font-bold">
                                <td className="py-3 px-4">Total Actifs</td>
                                <td className="py-3 px-4 text-right">
                                    {formatCurrency(
                                        bilan.facturesTotalementPaye +
                                        bilan.facturesPartiellementPaye +
                                        bilan.facturesImpayes
                                    )}
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
                                <td className="py-3 px-4 text-right">{formatCurrency(bilan.charges)}</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-semibold">Commission cours à domicile</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(bilan.commissionCoursDomicile)}</td>
                            </tr>
                            <tr className="bg-gray-100 font-bold">
                                <td className="py-3 px-4">Total Passifs</td>
                                <td className="py-3 px-4 text-right">
                                    {formatCurrency(
                                        bilan.charges +
                                        bilan.commissionCoursDomicile
                                    )}
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
                                    {formatCurrency(
                                        (bilan.facturesTotalementPaye +
                                         bilan.facturesPartiellementPaye +
                                         bilan.facturesImpayes) -
                                        (bilan.charges + bilan.commissionCoursDomicile)
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}