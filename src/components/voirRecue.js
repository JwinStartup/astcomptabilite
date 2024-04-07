import React,{useEffect,useState,} from 'react'
import { usePDF } from '@react-pdf/renderer';
import {WhatsappIcon,WhatsappShareButton} from "react-share";

import {PDFRecu} from './PDFRecu'
import { MdWhatsapp } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite.js'
import {useNavigate} from 'react-router-dom'
import ReactPDF, {PDFViewer,PDFDownloadLink,pdf, Page, Text,Image, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';
 import {FadeLoader}from 'react-spinners'
import  Axios  from 'axios';
const MyDoc = ({value})=>(
  <Document pageMode='fullScreen' title={`Reçue N° ${value._id.slice(value._id.length-3)}`}>
        <Page size="A7" style>
          <PDFRecu  value={value}/>
          </Page>
        </Document>
);



export default function VoirRecue({retour,value}) {
   const {isLoader,recue} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
   const [ficher,setFicher]=useState(null)
   const [ficherRecue,setFicherRecue]=useState(recue)
 const dispatch = useDispatch()
  
const download=async()=>{
 const blob = await pdf(
        <MyDoc value={recue} />
    ).toBlob();
 const blobUrl = window.URL.createObjectURL(blob);
 const anchor = window.document.createElement('a');
 console.log(blobUrl)
  anchor.download = `Reçue N° ${recue._id.slice(recue._id.length-3)}`;
  anchor.href = blobUrl;
  anchor.click();
  window.URL.revokeObjectURL(blobUrl);
 retour()
}
   const partager=async(recue)=>{
 const blob = await pdf(
        <MyDoc value={recue} />
    ).toBlob();
  const formdata = new FormData();
  let file = new File([blob], `Reçue${recue._id.slice(recue._id.length-3)}.pdf`);
   formdata.append("file", file);
   formdata.append("upload_preset","cfcpdf")
     Axios.post(
      "https://api.cloudinary.com/v1_1/cfcunadoc/image/upload",formdata
     ).then((response)=>{
      setFicher(response.data.secure_url)
      })
} 
 
useEffect(()=>{
 dispatch(comptabiliteActions.voirRecueByid(value._id)).then((d)=>partager(d.payload) )
},[value._id])

  
 console.log(recue,value._id)
  return ( <div>
 <div className='w-[300px]  border p-3 bg-white border-gray-100 shadow-md rounded-md   z-10 absolute top-[200px] left-[50px]'>
   {isLoader? <div>Chargement... </div>:<div> {recue===null?<div> Pas de recue</div>:<div>
       <div className='flex flex-row justify-between w-full'> 
        <div className='font-bold  tracking-tight text-lg text-black pl-1'>Reçue</div>
        <div className='font-medium  tracking-tight text-sm text-green-400 pl-1'>N° {recue._id.slice(recue._id.length-3)} </div>
      </div> 
      <div className='flex flex-row w-full  justify-between my-4'>
        <div className='ml-7'>
        <div className='text-sm font-medium text-gray-500'>{recue.client.nom}  {recue.client.prenoms}</div>
        <div className='text-sm font-medium text-gray-500'>{recue.client.cel}</div>

        </div>
        <div>
            <div className='font-bold  tracking-wide text-lg text-black '>{recue.montant} FCFA</div>
            <div className='font-medium text-center tracking-tight text-xs text-red-400 '>Montant payé</div>

        </div>

      </div>
            <div className='mx-7 font-bold  tracking-tight text-md text-black '>Periode : {recue.periodeAjouter}</div>
            <div className='mx-7 font-bold  tracking-tight text-md text-black '>Mode : {recue.modePaiement}</div>
            {recue.refPaiement&&<div className='mx-7 font-bold  tracking-tight text-md text-black '>Ref : {recue.refPaiement}</div>}
       
     
        <div className='mx-7  my-4'>
        <table className="w-full mx-2">
  <thead>
    <tr className="">
      <th  className='border-b-2 text-gray-400'>N* Facture</th>
      <th  className='border-b-2 text-gray-400'>Montant</th>
      
    </tr>
  </thead>
  <tbody>
  <tr className=' odd:bg-gray-100  bg-white rounded-3xl h-14 m-2  items-center w-full hover:bg-green-100 cursor-pointer'>
      <td className='font-medium text-base text-gray-500 text-center'>{recue.facture._id.slice(recue.facture._id.length - 3)}</td>
      <td className='font-medium text-base text-gray-500 text-center'>{recue.montant}</td>
    </tr>
  </tbody>
</table>
        </div>
             
        <div className='flex flex-col items-center my-2  space-y-3 w-full h-full'>
       <div className='flex flex-row '> 
       <button onClick={()=>retour()} 
       type="button" className=" text-red-700    font-medium border-r text-sm px-3 py-2 text-center inline-flex items-center ">
        Retour
        </button>
        <button 
       type="button" onClick={()=>download()} className=" text-blue-700    font-medium border-r text-sm px-3 py-2 text-center inline-flex items-center">
        Telecharger
        </button>
      {ficher==null?<span    className=" text-green-700 gap-2 font-medium text-sm px-3 py-2 text-center inline-flex items-center">
       loading...
       </span>:
         <WhatsappShareButton 
         url={ficher}
            title={`Votre facture N° ${recue._id.slice(recue._id.length-3)} a étè par ASTRAINIG BUSINESS`}
            >
              <button type="button"   className=" text-green-700 gap-2 font-medium text-sm px-3 py-2 text-center inline-flex items-center">
                     <WhatsappIcon logoFillColor='white' size={30} round={true}> 
                     </WhatsappIcon> 
                     Partager 
              </button>
           </WhatsappShareButton>
         }
        </div>
        </div>
          </div>}
          </div>}
         </div>
    </div>
  )
}
