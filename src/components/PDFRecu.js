import moment from "moment"
import 'moment/min/locales'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import myIcon from '../assets/ASTRAINING_LOGO_PNG.png'
import { createTw } from "react-pdf-tailwind";
import ReactPDF, {PDFViewer, Page, Text,Image, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';
const tw = createTw({
    theme: {
      fontFamily: {
        sans: ["Comic Sans"],
      },
      extend: {
        colors: {
          custom: "#bada55",
        },
      },
    },
  });


export  const PDFRecu=({value})=>{
    return(
      <View style={tw('bg-white px-5 pt-5')}>
      <View style={tw('flex flex-row  w-full mb-2   justify-center ')}>
      <Image source={myIcon} style={tw('w-8 h-8 ')}/>
      <Text style={tw('font-bold  tracking-tight text-[18px] text-red-500 pl-2')}>
        AS-TRAINING
      </Text>
      </View>
      <View style={tw('flex flex-row justify-center gap-3 w-full')}> 

        <Text style={tw('font-bold  tracking-tight text-[11px] text-black pl-1')}>
            Reçue
        <Text style={tw('font-normal  tracking-tight text-[12px] text-red-400 pl-1')}> N° {value._id.slice(value._id.length-3)} </Text>
      </Text></View> 
      <View style={tw('flex flex-col w-full   justify-between ')}>
      <View style={tw('my-2 border-b border-b-black py-1')}>
      <Text style={tw('text-sm font-bold text-black ')}>Information(s) Client</Text>
      </View>
        <View style={tw(' ')}>
        <Text style={tw('text-sm font-medium text-gray-500')}>Client: {value.client.nom}  {value.client.prenoms}</Text>
        <Text style={tw('text-sm font-medium text-gray-500')}>Cel: {value.client.cel}</Text>
        </View>
        <View style={tw('my-1  border-b border-b-black ')}>
      <Text style={tw('text-sm font-bold text-black mb-1 uppercase tracking-wide')}>Information transaction</Text>
      </View>
        <View style={tw('bg-gray-50 rounded-lg px-2 py-1 mb-2')}>
        <Text style={tw('font-semibold tracking-tight text-sm text-gray-700 mb-1')}>Période : <Text style={tw('font-normal')}>{value.periodeAjouter}</Text></Text>
        <Text style={tw('font-semibold tracking-tight text-sm text-gray-700 mb-1')}>N° Facture : <Text style={tw('font-normal')}>{value.facture._id.slice(value.facture._id.length-3)}</Text></Text>
        <Text style={tw('font-semibold tracking-tight text-sm text-gray-700 mb-1')}>Mode : <Text style={tw('font-normal')}>{value.modePaiement}</Text></Text>
        {value.refPaiement && (
          <Text style={tw('font-semibold tracking-tight text-sm text-gray-700 mb-1')}>Réf : <Text style={tw('font-normal')}>{value.refPaiement}</Text></Text>
        )}
        <Text style={tw('font-bold tracking-tight text-base text-red-600 mt-2')}>Montant payé : {value.montant} FCFA</Text>
        </View>

      </View>
        <View style={tw('flex justify-end pb-1 mt-8')}>
        <Text style={tw('font-medium tracking-tight text-[9px] text-gray-700 italic')}>Créé le {moment(`${value.createdAt}`).locale('fr').format('LLLL')}</Text>
        </View>

        <View style={tw('flex flex-col justify-center border-t border-t-red-500  mt-1')}>
        <Text style={tw(' font-medium  tracking-tight text-[8px] text-red-400 text-center mx-3 ')}>AS-TRAINING,  nous communiquons l'excellence</Text>
        <Text style={tw(' font-medium  tracking-tight text-[8px] text-green-400 text-center mx-3')}>Contact: 07 59 63 27 88 </Text>
        <Text style={tw(' font-medium  tracking-tight text-[8px] text-black text-center mx-3')}>Email: groupeas.info@yahoo.fr</Text>
        </View>

           
     
        
        
    </View>
      
    )
}

