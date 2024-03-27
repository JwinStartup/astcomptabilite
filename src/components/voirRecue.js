import React from 'react'
import { usePDF } from '@react-pdf/renderer';
import {PDFRecu} from './PDFRecu'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite.js'
import {useNavigate} from 'react-router-dom'
import ReactPDF, {PDFViewer,PDFDownloadLink,pdf, Page, Text,Image, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';
 import {FadeLoader}from 'react-spinners'
import  Axios  from 'axios';
const MyDoc = ({value})=>(
  <Document pageMode='fullScreen' title={`Reçue`}>
        <Page size="A7" style>
          <PDFRecu  value={value}/>
          </Page>
        </Document>
);



export default function VoirRecue({retour,value}) {
 const dispatch = useDispatch()
const download=async()=>{
 const blob = await pdf(
        <MyDoc value={value} />
    ).toBlob();
 const blobUrl = window.URL.createObjectURL(blob);
 const anchor = window.document.createElement('a');
 console.log(blobUrl)
  anchor.download = `Reçue N° ${value._id.slice(value._id.length-6)}`;
  anchor.href = blobUrl;
  anchor.click();
  window.URL.revokeObjectURL(blobUrl);
 retour()
}
 const partager=async()=>{
 const blob = await pdf(
        <MyDoc value={value} />
    ).toBlob();
  const formdata = new FormData();
  let file = new File([blob], `Reçue${value._id.slice(value._id.length-6)}.pdf`);
   formdata.append("file", file);
   formdata.append("upload_preset","cfcpdf")
     Axios.post(
      "https://api.cloudinary.com/v1_1/cfcunadoc/image/upload",formdata
     ).then((response)=>{
      console.log(response.data)
      dispatch(comptabiliteActions.partager(response.data.publicId))
      })
   retour()
}
  return (
    <div className='w-[500px]  border p-3 bg-white border-gray-100 shadow-md rounded-3xl   z-10 absolute top-[125px] left-[400px]'>
      <div className='flex flex-row justify-between w-full'> 
        <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Reçue</div>
        <div className='font-medium  tracking-tight text-[14px] text-green-400 pl-1'>N° {value._id.slice(value._id.length-6)} </div>
      </div> 
      <div className='flex flex-row w-full  justify-between my-4'>
        <div className='ml-7'>
        <div className='text-sm font-medium text-gray-500'>id : {value.client._id.slice(value.client._id.length-6)}</div>
        <div className='text-lg font-medium text-gray-500'>{value.client.nom}  {value.client.prenoms}</div>
        <div className='text-sm font-medium text-gray-500'>{value.client.cel}</div>

        </div>
        <div>
            <div className='font-bold  tracking-wide text-[18px] text-black '>{value.montant} FCFA</div>
            <div className='font-medium text-center tracking-tight text-[11px] text-red-400 '>Montant payé</div>

        </div>

      </div>
            <div className='mx-7 font-bold  tracking-tight text-md text-black '>Periode : {value.periodeAjouter}</div>
            <div className='mx-7 font-bold  tracking-tight text-md text-black '>Mode : {value.modePaiement}</div>
            {value.refPaiement&&<div className='mx-7 font-bold  tracking-tight text-md text-black '>Ref : {value.refPaiement}</div>}
       
     
        <div className='mx-7  my-4'>
        <table className="w-full mx-2">
  <thead>
    <tr className="">
      <th  className='border-b-2 text-gray-400'>N* Facture</th>
      <th  className='border-b-2 text-gray-400'>Designation</th>
      <th  className='border-b-2 text-gray-400'>Montant</th>
      
    </tr>
  </thead>
  <tbody>
  <tr className=' odd:bg-gray-100  bg-white rounded-3xl h-14 m-2  items-center w-full hover:bg-green-100 cursor-pointer'>
      <td className='font-medium text-base text-gray-500 text-center'>{value.facture._id.slice(value.facture._id.length - 6)}</td>
      <td className='font-medium text-base text-gray-500 text-center'>Cours à domicile - CM1</td>      
      <td className='font-medium text-base text-gray-500 text-center'>{value.montant}</td>
    </tr>
  </tbody>
</table>
        </div>
        <div className='flex flex-col items-center my-2  space-y-3 w-full h-full'>
        <div className='flex flex-row space-x-6'>  <button onClick={()=>retour()} type="button" className="text-white bg-red-700 hover:bg-red-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ">
        Retour
        </button>
        <button type="button" className="text-white bg-blue-700 hover:bg-bleu-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" onClick={() => download()}>Telecharger</button>  
        <button type="button" className="text-white bg-green-700 hover:bg-bleu-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" onClick={() => partager()}>Partager</button>
       
          </div>
        </div>
    </div>
  )
}
