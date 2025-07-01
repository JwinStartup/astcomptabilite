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
              <Text style={tw('font-bold tracking-tight text-[13px] text-black pl-1')}>
                Facture
                <Text style={tw('font-normal tracking-tight text-[13px] text-blue-500 pl-2')}>
                  N° {value._id?.slice(value._id.length-3)}
                </Text>
              </Text>
            </View>
            <View style={tw('flex flex-col w-full justify-between')}>
              <View style={tw('my-2 border-b border-b-black py-1')}>
                <Text style={tw('text-sm font-bold text-black')}>Information(s) Client</Text>
              </View>
              <View>
                <Text style={tw('text-xs font-medium text-gray-700 mb-1')}>Client : {value?.client?.nom} {value?.client?.prenoms}</Text>
                <Text style={tw('text-xs font-medium text-gray-700 mb-1')}>Cel : {value?.client?.cel}</Text>
                <Text style={tw('text-xs font-medium text-gray-700 mb-1')}>Période : {value?.periode}</Text>
              </View>

              {/* Tableau des cours */}
              <View style={tw('mt-4 border border-blue-200 rounded-lg overflow-hidden')}>
                <View style={tw('flex flex-row bg-blue-100')}>
                  <Text style={tw('w-[60px] py-1 px-1 text-xs font-bold text-blue-900')}>Année</Text>
                  <Text style={tw('flex-1 py-1 px-1 text-xs font-bold text-blue-900')}>Élève</Text>
                  <Text style={tw('w-[60px] py-1 px-1 text-xs font-bold text-blue-900')}>Classe</Text>
                  <Text style={tw('w-[70px] py-1 px-1 text-xs font-bold text-blue-900 text-right')}>Montant</Text>
                </View>
                {Array.isArray(value?.cours) && value.cours.length > 0 ? (
                  value.cours.map((cours, i) => (
                    <View key={cours._id || i} style={tw(`flex flex-row ${i%2===0 ? 'bg-white' : 'bg-gray-50'}`)}>
                      <Text style={tw('w-[60px] py-1 px-1 text-xs')}>{cours.anneeAcademique}</Text>
                      <Text style={tw('flex-1 py-1 px-1 text-xs')}>{cours.eleve?.nom} {cours.eleve?.prenoms}</Text>
                      <Text style={tw('w-[60px] py-1 px-1 text-xs')}>{cours.classe}</Text>
                      <Text style={tw('w-[70px] py-1 px-1 text-xs text-right')}>{cours.prix || 0} FCFA</Text>
                    </View>
                  ))
                ) : (
                  <View style={tw('flex flex-row')}>
                    <Text style={tw('py-1 px-1 text-xs text-gray-400')}>Aucun cours</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={tw('flex justify-end p-2 mr-7')}>
              <Text style={tw('font-medium tracking-tight text-[9px] text-black italic')}>
                La présente facture est arrêtée à la somme de <Text style={tw('font-bold tracking-wider text-[9px] text-red-500')}>{value?.montant} FCFA</Text>
              </Text>
            </View>
            <View style={tw('flex justify-end mt-6 pb-1')}>
              <Text style={tw('font-medium tracking-tight text-[9px] text-black')}>
                Créée le {moment(`${value?.createdAt}`).locale('fr').format('LLLL')}
              </Text>
            </View>
            <View style={tw('flex flex-col justify-center border-t border-t-red-500 mt-2 pt-1')}>
              <Text style={tw('font-medium tracking-tight text-[8px] text-red-400 text-center mx-3')}>
                AS-TRAINING, nous communiquons l'excellence
              </Text>
              <Text style={tw('font-medium tracking-tight text-[8px] text-green-400 text-center mx-3')}>
                Contact: 07 59 63 27 88
              </Text>
              <Text style={tw('font-medium tracking-tight text-[8px] text-black text-center mx-3')}>
                Email: groupeas.info@yahoo.fr
              </Text>
            </View>
          </View>
      
    )
}
