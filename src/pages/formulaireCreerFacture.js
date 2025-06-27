import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment from "moment"
import "moment/min/locales"
import { useSearchParams } from 'react-router-dom';
import { comptabiliteActions } from '../reducer/comptabilite.js'


export default function FormulaireCreerFacture({retour}) {
  const { register, handleSubmit } = useForm()
  const [montant, setMontant] = useState(0)
  const [chargement, setChargement] = useState(false)
  const [searchParentSelect, setSearchParentSelect] = useState("")
  const [selectedParent, setSelectedParent] = useState(null)
  const [selectedCours, setSelectedCours] = useState([]) // remplace selectedEnfants
  const [showParentDropdown, setShowParentDropdown] = useState(false)
  const [mois, setMois] = useState("")
  const [annee, setAnnee] = useState("")
  const dispatch = useDispatch()

  // Récupération des paramètres de l'URL (ex: t et cours)
  const [searchParams] = useSearchParams();
  const type = searchParams.get('t');      // 'cd' pour cours à domicile ou 'new' pour logique de base
  const coursId = searchParams.get('cours'); // id du cours sélectionné

  // Récupération du cours depuis le store si type === 'cd'
  const {cour} = useSelector(state => state.comptabiliteReducer);
  console.log('cour:', cour);
  // Récupération des parents
  const {isLoader,parents} = useSelector((state)=> state.userReducer);

  // Si type === 'cd', on va chercher le cours par son id
  useEffect(() => {
    console.log('type:', type, 'coursId:', coursId);
    if ((type === "cd") && coursId) {
      dispatch(comptabiliteActions.getCoursById(coursId)).then(()=>console.log('le cours a été chargé'));
    }
    // Si type === 'new', on ne fait rien de spécial, on garde la logique de base
  }, [type, coursId, dispatch]);

  // Si type === 'cd', on initialise selectedParent avec cour.parent
  useEffect(() => {
    if ((type === "cd") && cour && cour.parent) {
      setSelectedParent(cour.parent);
      setSelectedCours([cour]); // sélectionne le cours par défaut
    }
    // Si type === 'new', on ne fait rien de spécial, on garde la logique de base
  }, [type, cour]);

  // Filtrage des parents selon la recherche dans le select custom (hors type cd)
  const filteredParents = parents.filter(p =>
    (p.nom + " " + p.prenoms).toLowerCase().includes(searchParentSelect.toLowerCase())
  )

  // Gestion sélection parent (hors type cd)
  const onChangeParent = (p) => {
    setSelectedParent(p)
    setSelectedCours([]) // reset sélection
    setMontant(0)
    setShowParentDropdown(false)
    setSearchParentSelect("")
  }

  // Gestion sélection cours (cases à cocher)
  const handleCheckCours = (cours, checked) => {
    let newSelected;
    if (checked) {
      newSelected = [...selectedCours, cours]
    } else {
      newSelected = selectedCours.filter(e => e._id !== cours._id)
    }
    setSelectedCours(newSelected)
    // Calcul du montant total
    let total = newSelected.reduce((acc, el) => acc + (el.montant || el.prix || 0), 0)
    setMontant(total)
  }

  const onSubmit = (data) => {
    // Affiche les données sélectionnées dans une alerte
    alert(JSON.stringify({
      client: selectedParent,
      cours: selectedCours,
      montant: montant,
      periode: { mois, annee },
      anneeAcademique: anneeAcademique // ajout de l'année académique
    }, null, 2))
    /* setChargement(true)
    dispatch(comptabiliteActions.creerFacture({
      client: selectedParent?._id,
      enfants: selectedEnfants.map(e => e._id),
      montant: montant,
      periodeAjouter: `${mois} ${annee}`,
      anneeAcademique: anneeAcademique // ajout de l'année académique
    })).then(()=>{
      setChargement(false)
      retour()
    })*/
  }
  

  // Ajout de l'état pour l'année académique
  const [anneeAcademique, setAnneeAcademique] = useState("");

  // Correction : initialiser la valeur par défaut de l'année académique si possible
  useEffect(() => {
    if (cour?.anneeAcademique && !anneeAcademique) {
      setAnneeAcademique(cour.anneeAcademique);
    }
  }, [cour, anneeAcademique]);

  // Ajout d'un état pour le chargement global de la page
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // On considère la page chargée quand les données nécessaires sont prêtes
    if (type === "cd") {
      // Pour un cours à domicile, on attend que cour soit chargé
      if (cour && cour.parent) setPageLoading(false);
      else setPageLoading(true);
    } else {
      // Pour la logique de base, on attend que les parents soient chargés
      if (!isLoader) setPageLoading(false);
      else setPageLoading(true);
    }
  }, [type, cour, isLoader]);

  // Ajout des logs pour le debug
  useEffect(() => {
    console.log("type",type);
    console.log("courId",coursId);
    console.log("cour",cour);
    console.log("selectedParent:", selectedParent);
    console.log("selectedCours:", selectedCours);
    console.log("anneeAcademique:", anneeAcademique);
    console.log("mois:", mois, "annee:", annee);
  }, [selectedParent, selectedCours, anneeAcademique, mois, annee,type,coursId,courId]);

  if (pageLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
          <span className="text-blue-600 font-semibold text-lg">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
      <div className="w-full max-w-lg mx-auto border p-8 bg-white border-blue-100 shadow-2xl rounded-2xl">
        <div className="font-bold text-2xl text-blue-700 mb-6 text-center">Créer une facture</div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col gap-6 w-full'>
          {/* Sélection parent avec recherche intégrée */}
          {(type !== "cd") && (
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
                  {/* Affiche le loader si les parents sont en cours de chargement */}
                  {isLoader && (
                    <div className="flex items-center justify-center py-4">
                      <svg className="animate-spin h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                      </svg>
                      <span className="text-blue-500 text-sm">Chargement...</span>
                    </div>
                  )}
                  {!isLoader && filteredParents.length === 0 && (
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
          )}
          {/* Liste cours à sélectionner */}
          {selectedParent && (
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                {type === "cd" ? "Cours à domicile" : "Sélectionner les cours"}
              </label>
              <div className='flex flex-col gap-2 max-h-40 overflow-y-auto border rounded-lg p-2 bg-gray-50'>
                {(type === "cd") ? (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCours.some(e => e._id === cour?._id)}
                      onChange={e => handleCheckCours(cour, e.target.checked)}
                      className="accent-blue-600"
                      disabled // Un seul cours, donc toujours sélectionné et non modifiable
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {cour?.eleve?.nom} {cour?.eleve?.prenoms} - {cour?.classe}
                      <span className="ml-2 text-xs text-gray-500">({cour?.prix || 0} FCFA)</span>
                    </span>
                  </label>
                ) : (
                  selectedParent.cours && selectedParent.cours.length > 0 ? (
                    selectedParent.cours.map((cours, idx) => (
                      <label key={cours._id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCours.some(e => e._id === cours._id)}
                          onChange={e => handleCheckCours(cours, e.target.checked)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          <span className="mr-2 text-xs text-gray-500">({cours.anneeAcademique})</span>
                          {cours?.eleve?.nom}  {cours?.eleve?.prenoms} - {cours.classe}
                          <span className="ml-2 text-xs text-gray-500">({cours.montant || cours.prix || 0} FCFA)</span>
                        </span>
                      </label>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">Aucun cours trouvé</span>
                  )
                )}
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
          {/* Sélection de l'année académique */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Année académique</label>
            <select
              value={anneeAcademique || "2024-2025"}
              onChange={e => setAnneeAcademique(e.target.value)}
              className='w-full border rounded-lg px-3 py-2 text-sm bg-gray-100'
              required
            >
              <option value="">Sélectionner</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>
          {/* Tableau récapitulatif */}
          {selectedCours.length > 0 && (
            <div className="mt-2">
              <div className="font-semibold text-gray-700 mb-2">Résumé</div>
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="py-2 px-2 text-left">Année</th>
                    <th className="py-2 px-2 text-left">Nom & prenoms</th>
                    <th className="py-2 px-2 text-left">Classe</th>
                    <th className="py-2 px-2 text-left">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCours.map((el, i) => (
                    <tr key={el._id} className={i%2===0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-2 px-2">{el.anneeAcademique}</td>
                      <td className="py-2 px-2">{el.eleve?.nom} {el.eleve?.prenoms}</td>
                      <td className="py-2 px-2">{el.classe}</td>
                      <td className="py-2 px-2">{el.montant || el.prix || 0} FCFA</td>
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

