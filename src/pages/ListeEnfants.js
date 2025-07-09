import React, { useEffect, useState } from 'react'
import Entete from '../components/entete'
import { useNavigate } from 'react-router-dom'
import Backdrop from '../components/backdrop'
import SupprimerEnfants from '../components/supprimerEnfants.js'
import { useDispatch,useSelector } from 'react-redux';
import { userActions } from '../reducer/user.js'
import { RingLoader } from 'react-spinners'

export default function ListeEnfant() {
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const [rub , setRub]=useState({bol:false,value:null})
 
   useEffect(() => { 
    dispatch(userActions.listeEnfant())
  },[rub])
   
    const {isLoader,enfants}  = useSelector((state)=>{
      return state.userReducer
     });

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
       
        <Entete />
        <div className="w-full flex flex-col items-center mt-6">
          <div className="w-full max-w-5xl flex flex-row items-center justify-between mb-6 px-2">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm px-5 py-2.5 shadow transition-colors"
              onClick={()=>navigate("/cp")}
            >
              Retour
            </button>
            <p className="text-2xl font-bold text-blue-800 tracking-tight">Liste des enfants inscrits</p>
            <button
              onClick={()=>navigate('/inscription/enfants')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-sm px-5 py-2.5 shadow transition-colors"
            >
              + Ajouter un enfant
            </button>
          </div>
          {isLoader===true ? (
            <div className="flex justify-center items-center h-40">
              <RingLoader color={"green"} size={60} />
            </div>
          ) : (
            <>
              {enfants.length===0 ? (
                <p className="text-center w-full text-gray-500 mt-10">Pas d'enfant inscrit</p>
              ) : (
                <div className="w-full flex justify-center mt-8">
                  <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-x-auto p-6 border border-blue-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200">
                          <th className='border-b-2 text-blue-700 py-3 font-semibold'>Nom</th>
                          <th className='border-b-2 text-blue-700 py-3 font-semibold'>Prénom</th>
                          <th className='border-b-2 text-blue-700 py-3 font-semibold'>Ville</th>
                          <th className='border-b-2 text-blue-700 py-3 font-semibold'>Commune</th>
                          <th className='border-b-2 text-blue-700 py-3 font-semibold'>Classe</th>
                          <th className='border-b-2 text-blue-700 py-3 font-semibold'>Cel</th>
                          <th className='border-b-2 text-blue-700 py-3 font-semibold'>Parent</th>
                          <th className='border-b-2 text-blue-700 py-3 font-semibold'>Formateur</th>
                          <th className='border-b-2 text-blue-700 py-3 font-semibold'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enfants.map((value,index)=>(
                          <tr key={index} className='odd:bg-gradient-to-r odd:from-green-50 odd:to-white even:bg-white rounded-3xl h-16 m-2 items-center w-full hover:bg-green-100 transition'>
                            <td className='font-semibold text-base text-blue-900 text-center py-2'>{value.nom}</td>
                            <td className='font-semibold text-base text-blue-900 text-center py-2'>{value.prenoms}</td>
                            <td className='font-medium text-base text-gray-700 text-center py-2'>{value.ville}</td>
                            <td className='font-medium text-base text-gray-700 text-center py-2'>{value.commune}</td>
                            <td className='font-medium text-base text-gray-700 text-center py-2'>{value.classe}</td>
                            <td className='font-medium text-base text-gray-700 text-center py-2'>{value.cel}</td>
                            <td className='font-medium text-base text-green-700 text-center py-2'>
                              {value.parent?.nom} {value.parent?.prenoms}
                            </td>
                            <td className='font-medium text-base text-gray-700 text-center py-2'>
                              {value.formateur.map((i,k)=> (
                                <span key={k} className="block">
                                  {i.nom} {i.prenoms} - <span className="italic">{i.discipline}</span>
                                </span>
                              ))}
                            </td>
                            <td className='flex flex-row gap-2 justify-center items-center py-2'>
                              <button
                                className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-3 py-1 rounded transition"
                                onClick={()=>navigate(`/modifier/enfants/${value._id}`)}
                              >
                                Modifier
                              </button>
                              <button
                                className="bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-3 py-1 rounded transition"
                                onClick={()=>setRub({bol:true,value:value})}
                              >
                                Supprimer
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
