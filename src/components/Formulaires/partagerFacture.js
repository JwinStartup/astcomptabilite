import React from 'react'
import { useDispatch } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';
export default function PartagerFacture({retour,value}) {
   const dispatch=useDispatch()
   
 const download=async()=>{
 const blob = await pdf(
        <MyDoc value={value} />
    ).toBlob();
 const blobUrl = window.URL.createObjectURL(blob);
 const anchor = window.document.createElement('a');
 console.log(blobUrl)
  anchor.download = `Facture N° ${value._id.slice(value._id.length-6)}`;
  anchor.href = blobUrl;
  anchor.click();
  window.URL.revokeObjectURL(blobUrl);

}
  
   {/*   const partager=async()=>{
 const blob = await pdf(
        <MyDoc value={value} />
    ).toBlob();
  const formdata = new FormData();
  let file = new File([blob], `Facture${value._id.slice(value._id.length-6)}.pdf`);
   formdata.append("file", file);
   formdata.append("upload_preset","cfcpdf")
     Axios.post(
      "https://api.cloudinary.com/v1_1/cfcunadoc/image/upload",formdata
     ).then((response)=>{
      console.log(response.data)
      dispatch(comptabiliteActions.partager({url:response.data.secure_url,filename:`Facture${value._id.slice(value._id.length-6)}.pdf`}))
      })
} */}
  return (
    <div className='w-[400px] space-y-4   items-center justify-center  border p-3 bg-white border-gray-100 shadow-md rounded-3xl   z-10 absolute top-[50% ] left-[50%]'>
        <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Supprimer une facture</div>
        <p className='font-lg  tracking-tight text-[18px] text-center' > Voulez-vous partager cette facture  <span className='font-lg  tracking-tight text-[18px] text-green-400 pl-1'>N* {value._id.slice(value._id.length-3)} </span> </p>

        <div className='flex flex-col items-center  w-full h-full'>
        <div className='flex flex-row space-x-6'> 
       <button onClick={()=>retour()} 
       type="button" className=" text-red-700    font-medium border-r text-sm px-5 py-2.5 text-center inline-flex items-center ">
        Retour
        </button>
         
        <button 
       type="button" onClick={()=>download()} className=" text-bleu-700    font-medium border-r text-sm px-5 py-2.5 text-center inline-flex items-center">
        Telecharger
        </button>
         
        <button type="button"   className=" green-blue-700 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center">
        Partager
        </button>
         </div>
        </div>
    </div>
  )
}
  
  
