import React,{useEffect,useState,} from 'react'
import { useDispatch } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';
import {PDFfacture} from '../PDFfacture';
import {WhatsappShareButton} from "react-share";
import  Axios  from 'axios';
import ReactPDF, {PDFViewer,PDFDownloadLink,pdf, Page,Text,Image, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';
import {FadeLoader}from 'react-spinners'
import {WhatsappIcon} from "react-share";
export default function PartagerFacture({retour,value}) {
   const [ficher,setFicher]=useState(null)
   const [chargement,setChargement]=useState(false)
   const dispatch=useDispatch()
   const MyDoc = ({value})=>(
  <Document pageMode='fullScreen' title={`Facture N° ${value._id.slice(value._id.length-3)}`}>
        <Page size="A7" style>
          <PDFfacture  value={value}/>
          </Page>
        </Document>
);
 const download=async()=>{
 const blob = await pdf(
        <MyDoc value={value} />
    ).toBlob();
 const blobUrl = window.URL.createObjectURL(blob);
 const anchor = window.document.createElement('a');
 console.log(blobUrl)
  anchor.download = `Facture N° ${value._id.slice(value._id.length-3)}`;
  anchor.href = blobUrl;
  anchor.click();
  window.URL.revokeObjectURL(blobUrl);

}
  
      const partager=async()=>{
         
 const blob = await pdf(
        <MyDoc value={value} />
    ).toBlob();
  const formdata = new FormData();
  let file = new File([blob], `Facture${value._id.slice(value._id.length-3)}.pdf`);
   formdata.append("file", file);
   formdata.append("upload_preset","cfcpdf")
     Axios.post(
      "https://api.cloudinary.com/v1_1/cfcunadoc/image/upload",formdata
     ).then((response)=>{
      setFicher(response.data.secure_url)
        
      })
} 
useEffect(()=>{
   partager()
})
  return (
    <div className='w-[300px]  space-y-4   items-center justify-center  border p-3 bg-white border-gray-100 shadow-md rounded-lg z-10 absolute top-[100px] left-[30px]'>
        <div className='font-bold  tracking-tight text-lg text-black pl-1'>Partager une facture</div>
        <p className='font-lg  tracking-tight text-sm text-center' > Voulez-vous partager cette facture  <span className='font-lg  tracking-tight text-[18px] text-green-400 pl-1'>N* {value._id.slice(value._id.length-3)} </span> </p>

        <div className='flex flex-col items-center  w-full h-full'>
        <div className='flex flex-row '> 
       <button onClick={()=>retour()} 
       type="button" className=" text-red-700  flex  font-medium border-r justify-center text-sm px-3 py-2 text-center inline-flex items-center ">
        Retour
        </button>
        <button 
       type="button" onClick={()=>download()} className=" text-blue-700 flex  justify-center font-medium border-r text-sm px-3 py-2 text-center inline-flex items-center">
        Telecharger
        </button>
      {ficher!==null?
      <WhatsappShareButton 
         url={ficher}
            title={`Bonjour M/Mne ${value.client.nom}. J'espère que vous allez bien. Vous trouverez ci-joint le lien de votre facture de prestation N° ${value._id.slice(value._id.length-3)} du mois de ${value.periodeAjouter} . Vous pourrez faire le règlement dès que possible d'ici le 5 du mois en cours soit en espèces, soit par dépôt orange money ou wave au 07 59 63 27 88. Excellente journée `}
            >
              <button type="button"   className=" text-green-700 gap-2 font-medium flex justify-center text-sm px-3 py-2 text-center inline-flex items-center">
                     <WhatsappIcon logoFillColor='white' size={30} round={true}> 
                     </WhatsappIcon> 
                     Partager 
              </button>
           </WhatsappShareButton>
      
      :<span className='flex flex-row items-center space-x-2 justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-green-400'>
       <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                 </svg>
              Loading...
           </span>
         }
         </div>
        </div>
    </div>
  )
}
  
  
