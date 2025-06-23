import React,{useEffect,useState,useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Axios  from 'axios';
 import {FadeLoader}from 'react-spinners'
import { AiFillCloseCircle } from "react-icons/ai";
import Avatar from 'react-avatar'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import {useNavigate} from 'react-router-dom'
import { comptabiliteActions } from '../reducer/comptabilite'
import { userActions } from '../reducer/user'
import Backdrop from '../components/backdrop'
import BilanComponent from '../components/bilanComponent'
import {UserContext} from '../context/authContext'


export default function ProfilPage() {
 const {auth} = useSelector((state)=>{
    return state.userReducer
   });
 const  [useur,setUseur] =useState(auth||JSON.parse(localStorage.getItem('user')))
const dispatch = useDispatch()
 const navigate=useNavigate()
const [rub , setRub]=useState({retour:false,id:null})
 const { login,logout, user } = useContext(UserContext);
  useEffect(() => { 
    dispatch(comptabiliteActions.listeBilan())
  },[])
  useEffect(() => { 
    dispatch(comptabiliteActions.voirTotal())
  },[])
  const {isLoader,bilans,total} = useSelector((state)=>{
    return state.comptabiliteReducer
   });
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center">
      {rub.retour !== false && (
        <div>
          <Backdrop />
          <BilanComponent retour={() => setRub({ retour: false })} id={rub.id} />
        </div>
      )}

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center py-6">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-wide">ASTComptable</h1>
        <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
          <IoIosArrowDropleftCircle size={32} color="#2563eb" className="hover:scale-110 transition-transform" />
          <h5 className="text-2xl font-bold ml-1 tracking-tight text-blue-800">Profil</h5>
        </div>
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6">
          <Avatar name={`${useur?.user?.nom}`} size="100" round={true} className="mb-3 shadow" />
          <div className="text-xl font-bold tracking-wider text-center text-blue-800 mb-1">
            {useur?.user?.nom} {useur?.user?.prenoms}
          </div>
          <div className="text-sm font-medium text-red-400 mb-2">{useur?.user?.role}</div>
          <button
            onClick={() => dispatch(userActions.deconnecte())}
            className="text-md font-semibold tracking-wider py-2 px-4 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition mb-2"
          >
            Se déconnecter
          </button>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-md mb-6">
          <div className="flex flex-row items-center justify-between bg-white rounded-lg shadow p-3">
            <span className="text-sm font-semibold text-gray-700">Commissions</span>
            <span className="text-lg font-bold text-green-700">{total === null ? '-' : total.commissions}</span>
          </div>
          <div className="flex flex-row items-center justify-between bg-white rounded-lg shadow p-3">
            <span className="text-sm font-semibold text-gray-700">Montant impayé</span>
            <span className="text-lg font-bold text-red-700">{total === null ? '-' : total.impayes}</span>
          </div>
          <div className="flex flex-row items-center justify-between bg-white rounded-lg shadow p-3">
            <span className="text-sm font-semibold text-gray-700">Montant payé</span>
            <span className="text-lg font-bold text-blue-700">{total === null ? '-' : total.payes}</span>
          </div>
        </div>

        <div className="mt-6 mb-2 w-full max-w-md">
          <p className="text-lg font-semibold tracking-tight text-blue-800 mb-2">Bilan financier</p>
        </div>

        {/* Liste des bilans financiers */}
        {isLoader ? (
          <div className="w-full flex justify-center items-center mt-10">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
          </div>
        ) : (
          <>
            {bilans.length === 0 ? (
              <p className="text-center w-full text-gray-500 mt-6">Pas de bilan pour le moment</p>
            ) : (
              <div className="flex flex-row gap-4 overflow-x-auto w-full p-3">
                {bilans.map((value, index) => (
                  <div
                    key={index}
                    onClick={() => setRub({ retour: true, id: value._id })}
                    className={`min-w-[200px] p-4 cursor-pointer bg-white border rounded-2xl shadow flex flex-col items-center hover:bg-blue-50 transition`}
                  >
                    <div className="text-lg font-bold text-blue-700 mb-1">Bilan financier</div>
                    <div className="text-sm text-gray-500 font-medium">{value.periode}</div>
                    <div className={`${value.statut === 'cloturé' ? 'text-red-400' : 'text-green-500'} tracking-wide text-sm font-medium mt-1`}>
                      {value.statut}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Autre fonctionnalité */}
        {useur?.user?.role === "Administrateur" && (
          <div className="w-full max-w-md mt-6">
            <button
              onClick={() => navigate('/userAdmin')}
              className="w-full border text-md font-semibold tracking-wider py-3 px-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
            >
              Voir les utilisateurs
            </button>
          </div>
        )}
      </div>
      <footer className="w-full text-center text-xs text-gray-400 py-4 mt-8">
        (c) 2024 Astraining by jwin technology
      </footer>
    </div>
  )
}
