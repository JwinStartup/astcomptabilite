import moment from "moment"
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


export  const PDFfacture=({value})=>{
    console.log(value)
    return(
      <View style={tw('bg-white pt-5 px-5')}>
            <View style={tw('flex flex-row  w-full mb-2   justify-center ')}>
            <Image source={myIcon} style={tw('w-8 h-8 ')}/>
            <Text style={tw('font-bold  tracking-tight text-[18px] text-red-500 pl-2')}>
              AS-TRAINING
            </Text>
            </View>
            <View style={tw('flex flex-row justify-center gap-3 w-full')}> 
      
              <Text style={tw('font-bold  tracking-tight text-[11px] text-black pl-1')}>
                  Facture
              <Text style={tw('font-normal  tracking-tight text-[12px] text-blue-400 pl-1')}> N° {value._id.slice(value._id.length-6)} </Text>
            </Text></View> 
            <View style={tw('flex flex-col w-full   justify-between ')}>
            <View style={tw('my-2 border-b border-b-black py-1')}>
            <Text style={tw('text-sm font-bold text-black ')}>Information Client</Text>
            </View>
              <View style={tw(' ')}>
              <Text style={tw('text-sm font-medium text-gray-500')}>Client: {value.client.nom}  {value.client.prenoms}</Text>
              <Text style={tw('text-sm font-medium text-gray-500')}>Cel: {value.client.cel}</Text>
              <Text style={tw('text-sm font-medium text-gray-500')}>Periode: {value.periodeAjouter}</Text>
      
              </View>

              <View style={tw(' mt-3 ')}>
              <View style={tw('bg-gray-200 p-2  w-full flex flex-row')}>

              <View style={tw(' ')}>
              <Text style={tw('text-sm font-medium text-black pr-2 ')}>
                Cours à domicile
              </Text>
              </View>
              <View style={tw('border-l border-l-gray-400 flex justify-center ')}>
              <Text style={tw('text-sm font-bold text-red-500 text-center pl-2')}>
              {value.montant} FCFA
              </Text>
              </View>

                </View>

              </View>
            </View>
              <View style={tw('flex justify-end   p-2 mr-7')}>
              <Text style={tw(' font-medium  tracking-tight text-[8px] text-black italic ')}>la presente facture est arretée à la somme de <Text style={tw(' font-bold  tracking-wider text-[8px] text-red-500 ')}>{value.montant} FCFA</Text></Text>
              </View>
              <View style={tw('flex justify-end mt-6  pb-1')}>
              <Text style={tw(' font-medium  tracking-tight text-[8px] text-black  ')}>crée le  moment(`${value.createdAt}`).format('LLLL')</Text>
              </View>
      
              <View style={tw('flex flex-col justify-center border-t border-t-red-500 ')}>
              <Text style={tw(' font-medium  tracking-tight text-[8px] text-red-400 text-center mx-3 ')}>AS-TRAINING,  nous communiquons l'excellence</Text>
              <Text style={tw(' font-medium  tracking-tight text-[8px] text-green-400 text-center mx-3')}>Telephone: 22 00 42 34 - 07 59 63 27 88 - 05 04 26 06 53 - 01 40 19 59 03</Text>
              <Text style={tw(' font-medium  tracking-tight text-[8px] text-black text-center mx-3')}>Email: astraining_info@yahoo.fr</Text>
              </View>
          </View>
      
    )
}
