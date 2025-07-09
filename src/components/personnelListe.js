import React, {useEffect} from 'react'
import Avatar from 'react-avatar'
import { useDispatch,useSelector } from 'react-redux';
import { userActions } from '../reducer/user.js'
import { useNavigate } from 'react-router-dom'

export default function PersonnelListe({voirPer}) {
   const dispatch=useDispatch()
   const navigate = useNavigate()
   
   useEffect(() => { 
    dispatch(userActions.listePersonnel())
  },[])
  
    const {isLoader,personnels}  = useSelector((state)=>{
      return state.userReducer
     })
  console.log(personnels)
  return(
    <div className="w-full flex flex-col items-center">
      {isLoader ? (
        <div className='w-full flex justify-center items-center mt-10'>
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2 py-6">
          {personnels.map((i, j) => (
            <div
              key={j}
              className="flex flex-col items-center bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl shadow-xl border border-green-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
            >
              <Avatar name={`${i?.nom} ${i?.prenoms}`} size="72" round={true} className="mb-3 shadow" />
              <div className="text-xl font-bold text-green-800 mb-1 group-hover:text-green-900 transition">{i?.nom} {i?.prenoms}</div>
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Discipline :</span> <span className="text-green-700">{i?.discipline}</span>
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Téléphone :</span> <span className="text-gray-800">{i?.cel}</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Ville :</span> <span className="text-gray-800">{i?.ville}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold text-xs shadow transition"
                  onClick={e => { e.stopPropagation(); navigate(`/modifier/personnels/${i._id}`); }}
                >
                  Modifier
                </button>
                <button
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-xs shadow transition"
                  onClick={e => { e.stopPropagation(); dispatch(userActions.supprimerPersonnel(i._id)); }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
