//creer un composant pour afficher les recues en utilisant le code de voirFacture.js
import React, { useState } from 'react'
import Axios from 'axios';
import { pdf, Document, Page } from '@react-pdf/renderer';
import { PDFRecu } from './PDFRecu';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

const MyDoc = ({ value }) => (
  <Document pageMode='fullScreen' title={`Reçue N° ${value._id.slice(value._id.length - 3)}`}>
    <Page size="A7">
      <PDFRecu value={value} />
    </Page>
  </Document>
);
export default function ComposantRecue({ value,facture }) {
    // Sécurité d'accès aux propriétés imbriquées
    const client = value?.client || {};
    const [ficher, setFicher] = useState(null);

    const download = async () => {
        const blob = await pdf(<MyDoc value={value} />).toBlob();
        const blobUrl = window.URL.createObjectURL(blob);
        const anchor = window.document.createElement('a');
        anchor.download = `Reçue N° ${value._id.slice(value._id.length - 3)}.pdf`;
        anchor.href = blobUrl;
        anchor.click();
        window.URL.revokeObjectURL(blobUrl);
    }

    const partager = async () => {
        const blob = await pdf(<MyDoc value={value} />).toBlob();
        const formdata = new FormData();
        let file = new File([blob], `Reçue${value._id.slice(value._id.length - 3)}.pdf`);
        formdata.append("file", file);
        formdata.append("upload_preset", "cfcpdf")
        Axios.post(
          "https://api.cloudinary.com/v1_1/cfcunadoc/image/upload", formdata
        ).then((response) => {
          setFicher(response.data.secure_url)
        })
    }

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
                            <td className='py-2 px-3 text-gray-800'>{value?.periodeAjouter}</td>
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
                    onClick={download}
                >
                    Télécharger
                </button>
                {ficher == null ? (
                    <button
                        type="button"
                        className="bg-green-600 text-white font-medium text-sm px-5 py-2 rounded-lg shadow hover:bg-green-700 transition-colors duration-200 w-full sm:w-auto"
                        onClick={partager}
                    >
                        Partager
                    </button>
                ) : (
                    <WhatsappShareButton
                        url={ficher}
                        title={`Salut M/Mne ${client.nom}. Vous trouverez ci-joint le lien de votre reçue  N° ${value._id.slice(value._id.length - 3)} de la facture de prestation N° ${value.facture?._id?.slice(value.facture._id.length - 3)} du mois de ${value.periodeAjouter} .Merci pour votre confiance et excellente journée `}
                    >
                        <button type="button" className="text-green-700 gap-2 font-medium text-sm px-3 py-2 text-center inline-flex items-center">
                            <WhatsappIcon logoFillColor='white' size={30} round={true} />
                            Partager
                        </button>
                    </WhatsappShareButton>
                )}
            </div>
        </div>    
    )
}
