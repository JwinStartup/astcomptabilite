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
              <Text style={tw('font-bold  tracking-tight text-[11px] text-black pl-1')}>
                  Facture
              <Text style={tw('font-normal  tracking-tight text-[12px] text-blue-400 pl-1')}> N° {value._id.slice(value._id.length-3)} </Text>
            </Text></View> 
            <View style={tw('flex flex-col w-full   justify-between ')}>
            <View style={tw('my-2 border-b border-b-black py-1')}>
            <Text style={tw('text-sm font-bold text-black ')}>Information(s) Client</Text>
            </View>
              <View style={tw(' ')}>
              <Text style={tw('text-sm font-medium text-gray-500')}>Client: {value.client.nom}  {value.client.prenoms}</Text>
              <Text style={tw('text-sm font-medium text-gray-500')}>Cel: {value.client.cel}</Text>
              <Text style={tw('text-sm font-medium text-gray-500')}>Période: {value.periode}</Text>
              </View>

              <View style={tw('mt-3')}>
                <View style={tw('flex flex-row justify-between items-center mb-1')}>
                  <Text style={tw('text-xs font-medium text-gray-700')}>Montant total :</Text>
                  <Text style={tw('text-xs font-bold text-blue-600')}>{value.montant} FCFA</Text>
                </View>
                {/* Statut */}
                <View style={tw('flex flex-row justify-between items-center mb-1')}>
                  <Text style={tw('text-xs font-medium text-gray-700')}>Statut :</Text>
                  <Text style={tw(
                    `text-xs font-bold px-2 py-1 rounded-full ${
                      value.type === 'impaye'
                        ? 'bg-red-100 text-red-600'
                        : value.type === 'enpartie'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-600'
                    }`
                  )}>
                    {value.type === 'impaye' && 'Impayé'}
                    {value.type === 'enpartie' && 'En partie'}
                    {value.type === 'totalite' && 'Payé'}
                  </Text>
                </View>
                {/* Si en partie, afficher montant payé et reste à payer */}
                {value.type === 'enpartie' && (
                  <View style={tw('flex flex-row justify-between items-center mb-1')}>
                    <Text style={tw('text-xs text-gray-500')}>Montant payé :</Text>
                    <Text style={tw('text-xs font-bold text-green-600')}>{value?.montantPaye || 0} FCFA</Text>
                  </View>
                )}
                {value.type === 'enpartie' && (
                  <View style={tw('flex flex-row justify-between items-center mb-1')}>
                    <Text style={tw('text-xs text-gray-500')}>Reste à payer :</Text>
                    <Text style={tw('text-xs font-bold text-red-600')}>{value?.resteAPayer || 0} FCFA</Text>
                  </View>
                )}
              </View>

              {/* Tableau des cours */}
              <View style={tw('mt-4 border border-gray-300 rounded-lg overflow-hidden')}>
                <View style={tw('flex flex-row bg-blue-50')}>
                  <Text style={tw('flex-1 py-1 px-1 text-xs font-bold')}>Année</Text>
                  <Text style={tw('flex-2 py-1 px-1 text-xs font-bold')}>Elève</Text>
                  <Text style={tw('flex-1 py-1 px-1 text-xs font-bold')}>Classe</Text>
                  <Text style={tw('flex-1 py-1 px-1 text-xs font-bold')}>Montant</Text>
                </View>
                {value?.cours?.map((cours, i) => (
                  <View key={cours._id || i} style={tw(`flex flex-row ${i%2===0 ? 'bg-white' : 'bg-gray-50'}`)}>
                    <Text style={tw('flex-1 py-1 px-1 text-xs')}>{cours.anneeAcademique}</Text>
                    <Text style={tw('flex-2 py-1 px-1 text-xs')}>{cours.eleve?.nom} {cours.eleve?.prenoms}</Text>
                    <Text style={tw('flex-1 py-1 px-1 text-xs')}>{cours.classe}</Text>
                    <Text style={tw('flex-1 py-1 px-1 text-xs')}>{cours.prix || 0} FCFA</Text>
                  </View>
                ))}
              </View>
            </View>
              <View style={tw('flex justify-end   p-2 mr-7')}>
              <Text style={tw(' font-medium  tracking-tight text-[8px] text-black italic ')}>la présente facture est arrêtée à la somme de <Text style={tw(' font-bold  tracking-wider text-[8px] text-red-500 ')}>{value.montant} FCFA</Text></Text>
              </View>
              <View style={tw('flex justify-end mt-6  pb-1')}>
              <Text style={tw(' font-medium  tracking-tight text-[8px] text-black  ')}>créée le {moment(`${value.createdAt}`).locale('fr').format('LLLL')}</Text>
              </View>
              <View style={tw('flex flex-col justify-center border-t border-t-red-500 ')}>
              <Text style={tw(' font-medium  tracking-tight text-[8px] text-red-400 text-center mx-3 ')}>AS-TRAINING,  nous communiquons l'excellence</Text>
              <Text style={tw(' font-medium  tracking-tight text-[8px] text-green-400 text-center mx-3')}>Contact:07 59 63 27 88 </Text>
              <Text style={tw(' font-medium  tracking-tight text-[8px] text-black text-center mx-3')}>Email: groupeas.info@yahoo.fr</Text>
              </View>
          </View>
      
    )
}
