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
      </div>
      <footer className="w-full text-center text-xs text-gray-400 py-4 mt-8">
        (c) 2024 Astraining by jwin technology
      </footer>
    </div>
  )
}
