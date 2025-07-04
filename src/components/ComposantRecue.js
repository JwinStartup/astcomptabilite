//creer un composant pour afficher les recues en utilisant le code de voirFacture.js
import React from 'react'

export default function ComposantRecue({ value,facture }) {
    // Sécurité d'accès aux propriétés imbriquées
    const client = facture?.client || {};
    return (
        <div className='bg-white shadow-lg rounded-xl p-4 mb-6 hover:shadow-2xl transition-shadow duration-300 max-w-xl mx-auto w-full'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2'>
                <span className='text-blue-700 font-bold text-lg'>
                    Reçue N° {value?._id?.slice(-3) || ''}
                </span>
                <span className='text-gray-400 text-xs sm:text-sm'>
                    {value?.createdAt ? new Date(value.createdAt).toLocaleDateString() : ''}
                </span>
            </div>
            <div className='text-gray-700 text-base mb-1'>
                <span className='font-medium'>Client :</span> {client.nom} {client.prenoms}
            </div>
            <div className='text-gray-700 text-base mb-3'>
                <span className='font-medium'>Contact :</span> {client.cel}
            </div>
            {/* Tableau des informations de paiement */}
            <div className='overflow-x-auto'>
                <table className='min-w-full text-sm border rounded-lg'>
                    <tbody>
                        <tr className='border-b'>
                            <td className='py-2 px-3 text-gray-500 font-medium'>Montant payé :</td>
                            <td className='py-2 px-3 text-gray-800 font-semibold'>{value?.montant} FCFA</td>
                        </tr>
                        <tr className='border-b'>
                            <td className='py-2 px-3 text-gray-500 font-medium'>Période :</td>
                            <td className='py-2 px-3 text-gray-800'>{value?.periode}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className='py-2 px-3 text-gray-500 font-medium'>Mode de paiement :</td>
                            <td className='py-2 px-3 text-gray-800'>{value?.modePaiement}</td>
                        </tr>
                        {value?.refPaiement && (
                            <tr>
                                <td className='py-2 px-3 text-gray-500 font-medium'>Référence de paiement :</td>
                                <td className='py-2 px-3 text-gray-800'>{value.refPaiement}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Boutons Télécharger et Partager */}
            <div className='flex flex-col sm:flex-row justify-end gap-3 mt-6'>
                <button
                    className='bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto'
                    onClick={() => alert('Télécharger la reçue')}
                >
                    Télécharger
                </button>
                <button
                    className='bg-green-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-colors duration-200 w-full sm:w-auto'
                    onClick={() => alert('Partager la reçue')}
                >
                    Partager
                </button>
            </div>
        </div>    
    )
}
