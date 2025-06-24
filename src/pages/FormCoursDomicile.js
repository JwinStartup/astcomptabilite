import React, { useEffect, useState } from 'react';
import Entete from '../components/entete.js';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// Données simulées
const elevesData = [
  { id: 1, nom: "Fatou Diop", parent: "Papa Diop" },
  { id: 2, nom: "Aliou Sow", parent: "Maman Sow" },
  { id: 3, nom: "Aminata Fall", parent: "Papa Fall" },
  { id: 4, nom: "Moussa Kane", parent: "Papa Kane" },
  { id: 5, nom: "Seynabou Gaye", parent: "Maman Gaye" }
];

const enseignantsData = [
  { id: 1, nom: "M. Ndiaye" },
  { id: 2, nom: "Mme Ba" },
  { id: 3, nom: "M. Sy" },
  { id: 4, nom: "Mme Diallo" },
  { id: 5, nom: "M. Faye" }
];

const matieresData = [
  "Mathématiques", "Physique", "Français", "Anglais", "SVT", "Histoire", "Géographie", "Philosophie", "Informatique"
];

export default function FormCoursDomicile() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, control, watch } = useForm();
  const [searchEleve, setSearchEleve] = useState('');
  const [showEleveDropdown, setShowEleveDropdown] = useState(false);
  const [searchEnseignant, setSearchEnseignant] = useState('');
  const [showEnseignantDropdown, setShowEnseignantDropdown] = useState(false);
  const [selectedMatieres, setSelectedMatieres] = useState([]);
     const dispatch=useDispatch()
       
       useEffect(() => { 
        dispatch(userActions.listeEnfant())
      },[])
      useEffect(() => { 
          dispatch(userActions.listePersonnel())
        },[])
        

      const {isLoader,enfants,personnels}  = useSelector((state)=>{
            return state.userReducer
           })
  // Pour remplir automatiquement le parent
  const selectedEleveId = watch("eleve");
  useEffect(() => {
    const eleve = enfants.find(e => String(e._id) === String(selectedEleveId));
    if (eleve) setValue("parent", eleve?.parent?.nom);
    else setValue("parent", "");
  }, [selectedEleveId, setValue]);

  // Gestion multi sélection matières
  const handleMatiereCheck = (matiere) => {
    setSelectedMatieres(prev =>
      prev.includes(matiere)
        ? prev.filter(m => m !== matiere)
        : [...prev, matiere]
    );
  };

  useEffect(() => {
    setValue("matieres", selectedMatieres);
  }, [selectedMatieres, setValue]);

  const onSubmit = data => {
    // Ici, ajouter la logique d'enregistrement (API ou Redux)
    alert('Cours ajouté !\n' + JSON.stringify(data, null, 2));
    navigate('/cd');
  };

  // Filtrage pour recherche élève
  const filteredEleves = enfants.filter(e =>
    e.nom.toLowerCase().includes(searchEleve.toLowerCase())
  );
  // Filtrage pour recherche enseignant
  const filteredEnseignants = personnels.filter(e =>
    e.nom.toLowerCase().includes(searchEnseignant.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Entete />
      <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">Nouveau cours à domicile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
       
          {/* Année académique */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Année académique</label>
            <select
              {...register("anneeAcademique", { required: true })}
              className="border rounded px-3 py-2"
              onChange={e => {
                // Ajoute automatiquement l'année précédente pour le format 2024-2025
                const annee = e.target.value;
                if (annee) {
                  const prev = (parseInt(annee, 10) - 1).toString();
                  setValue("anneeAcademique", `${prev}-${annee}`);
                }
              }}
              defaultValue=""
            >
              <option value="">Sélectionner l'année</option>
              <option value="2025">2025-2026</option>
              <option value="2026">2026-2027</option>
              <option value="2027">2027-2028</option>
            </select>
            {errors.anneeAcademique && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          </div>
          {/* Sélection élève avec recherche */}
          <div className="relative" tabIndex={0}
            onBlur={e => {
              if (!e.currentTarget.contains(e.relatedTarget)) setShowEleveDropdown(false);
            }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Élève</label>
            <div
              className="w-full border rounded px-3 py-2 bg-white cursor-pointer"
              onClick={() => setShowEleveDropdown(v => !v)}
            >
              {selectedEleveId
                ? enfants.find(e => String(e._id) === String(selectedEleveId))?.nom
                : "Sélectionner un élève"}
            </div>
            {showEleveDropdown && (
              <div className="absolute z-20 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-56 overflow-y-auto">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-3 py-2 border-b outline-none text-sm"
                  value={searchEleve}
                  onChange={e => setSearchEleve(e.target.value)}
                  autoFocus
                />
                <>
                {isLoader?<div className='w-full flex justify-center items-center mt-10 '> 
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg></div>:
                <>
                {filteredEleves.length === 0 && (
                    <div className="px-3 py-2 text-gray-400 text-sm">Aucun élève trouvé</div>
                )}
                {filteredEleves.map(eleve => (
                    <div
                    key={eleve._id}
                    className={`px-3 py-2 hover:bg-purple-50 cursor-pointer text-sm ${selectedEleveId === String(eleve._id) ? "bg-purple-100 font-semibold" : ""}`}
                    onClick={() => {
                        setValue("eleve", eleve._id);
                        setShowEleveDropdown(false);
                    }}
                    tabIndex={-1}
                    >
                    {eleve.nom} {eleve.prenoms}
                  </div>
                ))}
                </>}

                </>
              </div>
            )}
            <input type="hidden" {...register("eleve", { required: true })} />
            {errors.eleve && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          </div>
          {/* Parent (auto-rempli) */}
          <input {...register("parent", { required: true })} placeholder="Nom du parent" className="border rounded px-3 py-2 bg-gray-100" readOnly />
          {errors.parent && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          {/* Sélection enseignant avec recherche */}
          <div className="relative" tabIndex={0}
            onBlur={e => {
              if (!e.currentTarget.contains(e.relatedTarget)) setShowEnseignantDropdown(false);
            }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant</label>
            <div
              className="w-full border rounded px-3 py-2 bg-white cursor-pointer"
              onClick={() => setShowEnseignantDropdown(v => !v)}
            >
              {watch("enseignant")
                ? personnels.find(e => String(e._id) === String(watch("enseignant")))?.nom
                : "Sélectionner un enseignant"}
            </div>
            {showEnseignantDropdown && (
              <div className="absolute z-20 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-56 overflow-y-auto">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-3 py-2 border-b outline-none text-sm"
                  value={searchEnseignant}
                  onChange={e => setSearchEnseignant(e.target.value)}
                  autoFocus
                />
                {filteredEnseignants.length === 0 && (
                  <div className="px-3 py-2 text-gray-400 text-sm">Aucun enseignant trouvé</div>
                )}
                {filteredEnseignants.map(ens => (
                  <div
                    key={ens._id}
                    className={`px-3 py-2 hover:bg-purple-50 cursor-pointer text-sm ${watch("enseignant") === String(ens._id) ? "bg-purple-100 font-semibold" : ""}`}
                    onClick={() => {
                      setValue("enseignant", ens._id);
                      setShowEnseignantDropdown(false);
                    }}
                    tabIndex={-1}
                  >
                    {ens.nom} {ens.prenoms}
                  </div>
                ))}
              </div>
            )}
            <input type="hidden" {...register("enseignant", { required: true })} />
            {errors.enseignant && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          </div>
          {/* Classe */}
          <input {...register("classe", { required: true })} placeholder="Classe" className="border rounded px-3 py-2" />
          {errors.classe && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          {/* Sélection matières multi-check */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Matières</label>
            <div className="flex flex-wrap gap-2">
              {matieresData.map(matiere => (
                <label key={matiere} className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedMatieres.includes(matiere)}
                    onChange={() => handleMatiereCheck(matiere)}
                  />
                  {matiere}
                </label>
              ))}
            </div>
            {errors.matieres && <span className="text-red-500 text-xs">Sélectionnez au moins une matière</span>}
          </div>
          <input type="hidden" {...register("matieres", { required: true, validate: v => v && v.length > 0 })} />
          {/* Prix */}
          <input {...register("prix", { required: true })} placeholder="Prix" className="border rounded px-3 py-2" />
          {errors.prix && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          {/* Boutons */}
          <div className="flex flex-row gap-4 mt-2 justify-center">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg"
              onClick={() => navigate(-1)}
            >
              Retour
            </button>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
