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
    dispatch(userActions.liste())
  },[dispatch])
  const {isLoader,users} = useSelector((state)=>{
    return state.userReducer
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

        {/* Section Liste des utilisateurs */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Liste des utilisateurs</h2>
          {isLoader ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <FadeLoader color="#2563eb" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                  <div className="flex flex-col items-center mb-4">
                    <Avatar name={`${user.nom}`} size="60" round={true} className="mb-3 shadow" />
                    <div className="text-lg font-bold text-blue-800 text-center">
                      {user.nom} 
                    </div>
                    <div className="text-sm font-medium text-gray-600 mb-1">{user.email}</div>
                    <div className="text-sm font-medium text-blue-600 mb-1">{user.cel}</div>
                    <div className="text-sm font-medium text-blue-600 mb-1">{user.zone}</div>
                    <div className="text-xs font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-full">
                      {user.role}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => navigate(`/modifier/users/${user._id}`)}
                      className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => {
                        // navigater vers une page change mot de passe
                        navigate(`/changeMotpasse/${user._id}`)
                      }}
                      className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                    >
                      🔑 Changer mot de passe
                    </button>
                    <button
                      onClick={() => dispatch(userActions.supprimer(user._id))}
                      className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <footer className="w-full text-center text-xs text-gray-400 py-4 mt-8">
        (c) 2024 Astraining by jwin technology
      </footer>
    </div>
  )
}
