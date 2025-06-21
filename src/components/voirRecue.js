import moment from "moment"
import 'moment/min/locales'
import React, { useEffect, useState } from 'react'
import { usePDF } from '@react-pdf/renderer';
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { PDFRecu } from './PDFRecu'
import { MdWhatsapp } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite.js'
import { useNavigate } from 'react-router-dom'
import ReactPDF, { pdf, Document, Page } from '@react-pdf/renderer';
import { FadeLoader } from 'react-spinners'
import Axios from 'axios';

const MyDoc = ({ value }) => (
  <Document pageMode='fullScreen' title={`Reçue N° ${value._id.slice(value._id.length - 3)}`}>
    <Page size="A7">
      <PDFRecu value={value} />
    </Page>
  </Document>
);

export default function VoirRecue({ retour, value }) {
  const { isLoader, recue } = useSelector((state) => state.comptabiliteReducer);
  const [ficher, setFicher] = useState(null)
  const dispatch = useDispatch()

  const download = async () => {
    const blob = await pdf(<MyDoc value={recue} />).toBlob();
    const blobUrl = window.URL.createObjectURL(blob);
    const anchor = window.document.createElement('a');
    anchor.download = `Reçue N° ${recue._id.slice(recue._id.length - 3)}`;
    anchor.href = blobUrl;
    anchor.click();
    window.URL.revokeObjectURL(blobUrl);
    retour()
  }

  const partager = async (recue) => {
    const blob = await pdf(<MyDoc value={recue} />).toBlob();
    const formdata = new FormData();
    let file = new File([blob], `Reçue${recue._id.slice(recue._id.length - 3)}.pdf`);
    formdata.append("file", file);
    formdata.append("upload_preset", "cfcpdf")
    Axios.post(
      "https://api.cloudinary.com/v1_1/cfcunadoc/image/upload", formdata
    ).then((response) => {
      setFicher(response.data.secure_url)
    })
  }

  useEffect(() => {
    dispatch(comptabiliteActions.voirRecueByid(value._id)).then((d) => partager(d.payload))
  }, [value._id])

  // Nouveau design inspiré de FormulairePayerFacture
  return (
    <form
      className='w-full max-w-sm border p-6 bg-white border-gray-100 shadow-xl rounded-2xl z-50
        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        sm:static sm:translate-x-0 sm:translate-y-0 sm:mx-auto sm:my-10
        flex flex-col'
      style={{ maxWidth: 400 }}
    >
      {isLoader ? (
        <div className="flex justify-center items-center h-40">
          <FadeLoader color="#1D4ED8" />
        </div>
      ) : recue === null ? (
        <div className="text-center text-gray-500 py-8">Pas de reçue</div>
      ) : (
        <>
          <div className='flex flex-row justify-between items-center mb-4'>
            <div className='font-bold text-xl text-blue-700'>Reçue</div>
            <div className='font-medium text-sm text-green-500'>N° {recue._id.slice(recue._id.length - 3)}</div>
          </div>
          <div className='flex flex-row justify-between items-center mb-4'>
            <div>
              <div className='text-base font-semibold text-gray-700'>{recue.client.nom} {recue.client.prenoms}</div>
              <div className='text-xs text-gray-500'>{recue.client.cel}</div>
            </div>
            <div className='text-right'>
              <div className='font-bold text-lg text-blue-600'>{recue.montant} FCFA</div>
              <div className='text-xs text-gray-400'>Montant payé</div>
            </div>
          </div>
          <div className='mb-2'>
            <div className='flex flex-row justify-between'>
              <span className='text-sm text-gray-500'>Période :</span>
              <span className='font-medium text-gray-700'>{recue.periodeAjouter}</span>
            </div>
            <div className='flex flex-row justify-between'>
              <span className='text-sm text-gray-500'>Mode :</span>
              <span className='font-medium text-gray-700'>{recue.modePaiement}</span>
            </div>
            {recue.refPaiement &&
              <div className='flex flex-row justify-between'>
                <span className='text-sm text-gray-500'>Réf :</span>
                <span className='font-medium text-gray-700'>{recue.refPaiement}</span>
              </div>
            }
          </div>
          <div className='mb-4'>
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className='py-2 px-2 text-left'>N° Facture</th>
                  <th className='py-2 px-2 text-left'>Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className='py-2 px-2 text-center'>{recue.facture._id.slice(recue.facture._id.length - 3)}</td>
                  <td className='py-2 px-2 text-center'>{recue.montant} FCFA</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='w-full flex justify-end mb-2'>
            <span className='text-xs text-gray-400'>{moment(`${recue.createdAt}`).locale('fr').fromNow()}</span>
          </div>
          <div className='flex flex-row justify-center gap-4 mt-4'>
            <button
              onClick={() => retour()}
              type="button"
              className="text-blue-700 hover:text-blue-800 border-r font-medium text-sm px-5 py-2.5 text-center"
            >
              Retour
            </button>
            <button
              type="button"
              onClick={() => download()}
              className="font-medium text-md text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg shadow"
            >
              Télécharger
            </button>
            {ficher == null ? (
              <span className="text-green-700 gap-2 font-medium text-sm px-3 py-2 text-center inline-flex items-center">
                <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                loading...
              </span>
            ) : (
              <WhatsappShareButton
                url={ficher}
                title={`Salut M/Mne ${recue.client.nom}. Vous trouverez ci-joint le lien de votre reçue  N° ${recue._id.slice(recue._id.length - 3)} de la facture de prestation N° ${recue.facture._id.slice(recue.facture._id.length - 3)} du mois de ${recue.periodeAjouter} .Merci pour votre confiance et excellente journée `}
              >
                <button type="button" className="text-green-700 gap-2 font-medium text-sm px-3 py-2 text-center inline-flex items-center">
                  <WhatsappIcon logoFillColor='white' size={30} round={true} />
                  Partager
                </button>
              </WhatsappShareButton>
            )}
          </div>
        </>
      )}
    </form>
  )
}
