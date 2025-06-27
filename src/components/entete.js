import React,{useContext,useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { userActions } from '../reducer/user';
import { useDispatch,useSelector } from 'react-redux';
import {UserContext} from '../context/authContext'
import {useNavigate}from  'react-router-dom'
import Avatar from 'react-avatar'
import { AiOutlineLogout } from "react-icons/ai"

export default function Entete() {
  const { login,logout, user } = useContext(UserContext);
  const {auth} = useSelector((state)=>state.userReducer);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [useur, setUseur] = useState(auth || JSON.parse(localStorage.getItem('user')))

  return (
    <header className="w-full flex justify-between items-center px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-500 to-blue-700 shadow-md rounded-b-lg">
      <div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/')}>
        <img src="/logo192.png" alt="Logo" className="h-8 w-8 rounded-full shadow" />
        <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow">ASTComptable</h1>
      </div>
      {!useur ? (
        <Link
          className="me-3 inline-block rounded px-4 py-2 text-sm font-semibold bg-white text-blue-700 hover:bg-blue-50 shadow transition"
          to='/login'
        >
          Connectez-vous
        </Link>
      ) : (
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1 rounded-full shadow hover:bg-blue-50 transition"
            onClick={()=>navigate('/profil')}
          >
            <Avatar name={useur?.user?.nom} size="32" round={true} />
            <span className="font-medium text-blue-700 text-sm">{useur?.user?.nom}</span>
          </div>
          <button
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 text-blue-700 transition"
            onClick={logout}
            title="Déconnexion"
          >
            <AiOutlineLogout size={20} />
          </button>
        </div>
      )}
    </header>
  )
}
