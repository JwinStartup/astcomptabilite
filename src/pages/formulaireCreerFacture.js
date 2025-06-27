import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment from "moment"
import "moment/min/locales"
import { userActions } from '../reducer/user';

// Exemple de données parents avec enfants, classe et montant


export default function FormulaireCreerFacture({retour}) {
  const { register, handleSubmit } = useForm()
  const [montant, setMontant] = useState(0)
  const [chargement, setChargement] = useState(false)
  // const [searchParent, setSearchParent] = useState("") // supprimé
  const [searchParentSelect, setSearchParentSelect] = useState("")
  const [selectedParent, setSelectedParent] = useState(null)
  const [selectedEnfants, setSelectedEnfants] = useState([])
  const [showParentDropdown, setShowParentDropdown] = useState(false)
  const [mois, setMois] = useState("")
  const [annee, setAnnee] = useState("")
  const dispatch = useDispatch()
  
  useEffect(() => { 
    dispatch(userActions.listeParent())
  },[])
  
   const {isLoader,parents} = useSelector((state)=> state.userReducer);

  // Filtrage des parents selon la recherche dans le select custom
  const filteredParents = parents.filter(p =>
    (p.nom + " " + p.prenoms).toLowerCase().includes(searchParentSelect.toLowerCase())
  )

  // Gestion sélection parent
  const onChangeParent = (p) => {
    setSelectedParent(p)
    setSelectedEnfants([] )// reset enfants sélectionnés
    setMontant(0)
    setShowParentDropdown(false)
    setSearchParentSelect("")
  }

  // Gestion sélection enfants (cases à cocher)
  const handleCheckEnfant = (enfant, checked) => {
    let newSelected;
    if (checked) {
      newSelected = [...selectedEnfants, enfant]
    } else {
      newSelected = selectedEnfants.filter(e => e._id !== enfant._id)
    }
    setSelectedEnfants(newSelected)
    // Calcul du montant total
    let total = newSelected.reduce((acc, el) => acc + (el.montant || 0), 0)
    setMontant(total)
  }

  const onSubmit = (data) => {
    // Affiche les données sélectionnées dans une alerte
    alert(JSON.stringify({
      client: selectedParent,
      enfants: selectedEnfants,
      montant: montant,
      periode: { mois, annee }
    }, null, 2))
    /* setChargement(true)
    dispatch(comptabiliteActions.creerFacture({
      client: selectedParent?._id,
      enfants: selectedEnfants.map(e => e._id),
      montant: montant,
      periodeAjouter: `${mois} ${annee}`
    })).then(()=>{
      setChargement(false)
      retour()
    })*/
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
      <div className="w-full max-w-lg mx-auto border p-8 bg-white border-blue-100 shadow-2xl rounded-2xl">
        <div className="font-bold text-2xl text-blue-700 mb-6 text-center">Créer une facture</div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col gap-6 w-full'>
          {/* Sélection parent avec recherche intégrée */}
          <div className="relative" tabIndex={0}
            onBlur={e => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setShowParentDropdown(false)
              }
            }}
          >
            <label className='block text-sm font-medium text-gray-700 mb-1'>Choisir un parent</label>
            <div
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white cursor-pointer"
              onClick={() => setShowParentDropdown(v => !v)}
            >
              {selectedParent ? `${selectedParent.nom} ${selectedParent.prenoms}` : "Sélectionnez un parent"}
            </div>
            {showParentDropdown && (
              <div className="absolute z-20 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-56 overflow-y-auto">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-3 py-2 border-b outline-none text-sm"
                  value={searchParentSelect}
                  onChange={e => setSearchParentSelect(e.target.value)}
                  autoFocus
                />
                {filteredParents.length === 0 && (
                  <div className="px-3 py-2 text-gray-400 text-sm">Aucun parent trouvé</div>
                )}
                {filteredParents.map((val, index) => (
                  <div
                    key={val._id}
                    className={`px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm ${selectedParent?._id === val._id ? "bg-blue-100 font-semibold" : ""}`}
                    onClick={() => onChangeParent(val)}
                    tabIndex={-1}
                  >
                    {val.nom} {val.prenoms}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Liste enfants du parent */}
          {selectedParent && selectedParent.enfants && selectedParent.enfants.length > 0 && (
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Sélectionner les enfants</label>
              <div className='flex flex-col gap-2 max-h-40 overflow-y-auto border rounded-lg p-2 bg-gray-50'>
                {selectedParent.enfants.map((enfant, idx) => (
                  <label key={enfant._id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedEnfants.some(e => e._id === enfant._id)}
                      onChange={e => handleCheckEnfant(enfant, e.target.checked)}
                      className="accent-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {enfant.nom} - {enfant.classe}
                      <span className="ml-2 text-xs text-gray-500">({enfant.montant || 0} FCFA)</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {/* Montant total */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Montant total</label>
            <input
              disabled
              value={montant}
              type="number"
              className='w-full border rounded-lg px-3 py-2 text-sm bg-gray-100'
              placeholder='Montant prestation'
            />
          </div>
          {/* Sélection de la période */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Période (mois et année)</label>
            <input
              type="month"
              value={
                mois && annee
                  ? `${annee}-${mois.padStart(2, '0')}`
                  : (() => {
                      const d = new Date();
                      d.setMonth(d.getMonth() - 1);
                      const y = d.getFullYear();
                      const m = String(d.getMonth() + 1).padStart(2, '0');
                      setMois(m);
                      setAnnee(String(y));
                      return `${y}-${m}`;
                    })()
              }
              onChange={e => {
                const [y, m] = e.target.value.split('-')
                setMois(m)
                setAnnee(y)
              }}
              className='w-full border rounded-lg px-3 py-2 text-sm bg-gray-100'
              required
            />
          </div>
          {/* Tableau récapitulatif */}
          {selectedEnfants.length > 0 && (
            <div className="mt-2">
              <div className="font-semibold text-gray-700 mb-2">Résumé</div>
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="py-2 px-2 text-left">Désignation</th>
                    <th className="py-2 px-2 text-left">Classe</th>
                    <th className="py-2 px-2 text-left">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEnfants.map((el, i) => (
                    <tr key={el._id} className={i%2===0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-2 px-2">{el.nom}</td>
                      <td className="py-2 px-2">{el.classe}</td>
                      <td className="py-2 px-2">{el.montant || 0} FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Boutons */}
          <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-2 w-full'>
            <button
              type="button"
              onClick={()=>retour()}
              className="w-full sm:w-auto text-blue-700 hover:text-blue-800 border-r-0 sm:border-r font-medium text-sm px-5 py-2.5 text-center rounded sm:rounded-none"
            >
              Retour
            </button>
            {chargement === false ? (
              <button
                type='submit'
                className='w-full sm:w-auto font-medium text-md text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg shadow'
              >
                <span>Créer</span>
              </button>
            ) : (
              <span className='flex flex-row items-center space-x-2 justify-center px-3 py-2 text-md font-medium text-center text-black'>
                <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                Loading...
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

