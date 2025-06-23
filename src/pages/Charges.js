import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import  {useNavigate} from "react-router-dom"
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Backdrop from '../components/backdrop.js'
import VoirCharge from '../components/voirCharge.js'
import { useDispatch, useSelector } from 'react-redux'
import { comptabiliteActions } from '../reducer/comptabilite.js'
import { RingLoader } from 'react-spinners'
import { FaPlusCircle } from "react-icons/fa"
export default function Charges() {
  const navigate=useNavigate()
  const dispatch =useDispatch()
  const [rub , setRub]=useState(null)
  useEffect(() => { 
    dispatch(comptabiliteActions.listeCharge())
  },[rub])
  
  const {isLoader,charges} = useSelector((state)=>{
    return state.comptabiliteReducer
   },[rub]);
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Entete />
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row items-center justify-between w-full max-w-4xl py-4 px-2 bg-white/70 rounded-b-2xl shadow-md border-b mb-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/')}>
            <IoIosArrowDropleftCircle size={32} color="#2563eb" className="hover:scale-110 transition-transform" />
            <h5 className="text-2xl font-bold ml-1 tracking-tight text-blue-800">Charges</h5>
          </div>
          <FaPlusCircle
            color="gray"
            size={28}
            className="cursor-pointer hover:text-green-600 transition"
            onClick={()=>navigate('/creerCharge')}
          />
        </div>
        {isLoader === true ? (
          <div className="flex flex-wrap gap-6 justify-center items-center w-full py-10">
            {[1,2,3].map((i,j) => (
              <div key={j} className="animate-pulse flex flex-col border rounded-2xl w-[260px] h-[180px] px-4 py-6 bg-gray-100 shadow"></div>
            ))}
          </div>
        ) : (
          <>
            {charges.length === 0 ? (
              <p className="text-center w-full text-gray-500 mt-10">Pas de Charges enregistrées</p>
            ) : (
              <div className="w-full flex flex-wrap justify-center gap-6 mt-3 px-2">
                {charges.map((value, index) => (
                  <div key={index} className="w-full max-w-xs">
                    <VoirCharge
                      parama={(d) => setRub(d)}
                      value={value}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <footer className="w-full text-center text-xs text-gray-400 py-4 mt-8">
        (c) 2024 Astraining by jwin technology
      </footer>
    </div>
  )
}
