import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { comptabiliteActions } from '../reducer/comptabilite';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../reducer/user';
import { useNavigate } from 'react-router-dom'
import Entete from '../components/entete'
import { IoIosArrowDropleftCircle } from "react-icons/io";

export default function CreerCharge() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [select, setSelect] = useState('salaire')
  const [chargement, setChargement] = useState(false)
  const [mois, setMois] = useState('')
  const [annee, setAnnee] = useState(new Date().getFullYear().toString())
  
  // Liste des mois
  const moisOptions = [
    { value: '01', label: 'janvier' },
    { value: '02', label: 'février' },
    { value: '03', label: 'mars' },
    { value: '04', label: 'avril' },
    { value: '05', label: 'mai' },
    { value: '06', label: 'juin' },
    { value: '07', label: 'juillet' },
    { value: '08', label: 'août' },
    { value: '09', label: 'septembre' },
    { value: '10', label: 'octobre' },
    { value: '11', label: 'novembre' },
    { value: '12', label: 'décembre' }
  ]
  
  // Générer les années (année actuelle +/- 5 ans)
  const anneeActuelle = new Date().getFullYear()
  const anneesOptions = []
  for (let i = anneeActuelle - 5; i <= anneeActuelle + 5; i++) {
    anneesOptions.push(i.toString())
  }
  
  const onSubmit = (data) => {
    setChargement(true)
    // Construire la période formatée
    const moisSelectionne = moisOptions.find(m => m.value === mois)
    const periode = moisSelectionne ? `${moisSelectionne.label} ${annee}` : `${annee}`
    
    const formData = { ...data, periode: periode }
    dispatch(comptabiliteActions.creerCharge(formData)).then(() => {
      setChargement(false)
      navigate('/charges')
    })
  }
  useEffect(() => {
    dispatch(userActions.listePersonnel())
  }, [])

  const { isLoader, personnels } = useSelector((state) => {
    return state.userReducer
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      <Entete />
      <div className="flex items-center gap-2 px-4 pt-4 cursor-pointer" onClick={() => navigate('/charges')}>
        <IoIosArrowDropleftCircle size={30} className="text-blue-700" />
        <h5 className="text-xl font-bold tracking-tight text-gray-900">Ajouter une charge</h5>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
        className='flex flex-col items-center mt-6 space-y-4 w-full'
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col gap-4">
          <select
            {...register("type")}
            onChange={(e) => setSelect(e.target.value)}
            defaultValue='salaire'
            className='outline-none w-full border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition'
          >
            <option value='salaire'>Salaire personnel</option>
            <option value='loyer'>Loyer</option>
            <option value='autreCharge'>Autres charges</option>
          </select>
          {select === "salaire" &&
            <select
              {...register("personnel")}
              defaultValue=""
              className='outline-none w-full border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition'
            >
              <option className='text-gray-400' value="">Choisissez le personnel</option>
              {personnels.map((val, index) =>
                <option key={index} value={val.nom + " " + val.prenoms}>{val.nom} {val.prenoms}</option>
              )}
            </select>
          }
          {select === "autreCharge" &&
            <input
              {...register("nomCharge")}
              type="text"
              className='w-full border-b-2 py-2 text-md rounded-md bg-gray-50 pl-1 placeholder-gray-400 focus:border-blue-400 transition'
              placeholder='Préciser la charge'
            />
          }
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Période</label>
            <div className="flex gap-3">
              {/* Sélection du mois */}
              <select
                value={mois}
                onChange={(e) => setMois(e.target.value)}
                className='flex-1 outline-none border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition'
                required
              >
                <option value="">Choisir le mois</option>
                {moisOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {/* Sélection de l'année */}
              <select
                value={annee}
                onChange={(e) => setAnnee(e.target.value)}
                className='flex-1 outline-none border-b-2 py-2 text-md rounded-md bg-gray-50 focus:border-blue-400 transition'
                required
              >
                {anneesOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {mois && annee && (
              <span className="text-xs text-gray-500 mt-1 block">
                Période sélectionnée : {moisOptions.find(m => m.value === mois)?.label} {annee}
              </span>
            )}
          </div>
          <input
            {...register("montant")}
            type="text"
            className='w-full h-10 border-b-2 py-2 text-md rounded-md bg-gray-50 pl-1 placeholder-gray-400 focus:border-blue-400 transition'
            placeholder='Montant'
          />
          <textarea
            {...register("observation")}
            className='w-full border-b-2 py-2 text-md rounded-md bg-gray-50 pl-1 placeholder-gray-400 focus:border-blue-400 transition'
            placeholder='Observation...'
            rows={4}
          ></textarea>
          <div className='flex flex-row space-x-4 justify-center'>
            {chargement === false ?
              <button
                type='submit'
                className='flex items-center justify-center font-bold text-lg px-6 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition'
              >
                Créer
              </button>
              :
              <span className='flex items-center space-x-2 text-blue-700 font-medium'>
                <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                Loading...
              </span>
            }
          </div>
        </div>
      </form>
    </div>
  )
}
