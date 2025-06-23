import React,{useEffect,useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite.js'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import "moment/min/locales"


export default function VoirFacture({value,parama}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const supprimer = (id) => {
    dispatch(comptabiliteActions.supprimerCharge(id)).then((d) => parama(d.payload))
  }
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 w-full max-w-xs mx-auto border border-blue-100 rounded-2xl shadow-lg p-5 m-3 flex flex-col justify-between min-h-[220px]">
      <div className="absolute right-2 top-2 cursor-pointer">
        <AiFillCloseCircle color="#888" size={26} onClick={() => supprimer(value._id)} className="hover:text-red-500 transition" />
      </div>
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="font-bold tracking-tight text-lg text-blue-800">Charge</div>
        <span className="text-xs text-gray-400">{moment(`${value.updatedAt}`).locale('fr').fromNow()}</span>
      </div>
      <div className="flex flex-col gap-1 mb-2">
        {value.type === 'eaucourantintent' ? (
          <div className="text-sm font-bold text-gray-500">
            Type: <span className="text-green-600 font-bold">Eau-Courant-Internet</span>
          </div>
        ) : (
          <div className="text-sm font-bold text-gray-500">
            Type: <span className="text-blue-700 font-bold">{value.type}</span>
          </div>
        )}
        {value.nomCharge && (
          <div className="text-sm font-bold text-gray-500">
            Nom de la charge: <span className="text-green-600 font-bold">{value.nomCharge}</span>
          </div>
        )}
        <div className="text-sm font-medium text-gray-500">
          Montant: <span className="text-black font-bold">{value.montant} FCFA</span>
        </div>
        {value.type === 'salaire' && (
          <div>
            <div className="font-bold tracking-wide text-sm text-black">{value.personnel}</div>
            <div className="font-medium text-center tracking-tight text-[11px] text-gray-400">personnel</div>
          </div>
        )}
      </div>
      <div className="mx-1 font-medium tracking-tight text-sm text-black mb-1">{value.observation}</div>
      <div className="font-medium mt-1 tracking-tight text-xs text-gray-700 w-full text-end">{value.periodeAjouter}</div>
      <div className="flex flex-row justify-end mt-2">
        <button
          type="button"
          onClick={() => navigate(`/modifier/charge/${value._id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow transition"
        >
          Modifier
        </button>
      </div>
    </div>
  )
}
