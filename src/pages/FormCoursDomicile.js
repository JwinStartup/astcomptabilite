import React, { useState } from 'react';
import Entete from '../components/entete.js';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

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

  // Pour remplir automatiquement le parent
  const selectedEleveId = watch("eleve");
  React.useEffect(() => {
    const eleve = elevesData.find(e => String(e.id) === String(selectedEleveId));
    if (eleve) setValue("parent", eleve.parent);
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

  React.useEffect(() => {
    setValue("matieres", selectedMatieres);
  }, [selectedMatieres, setValue]);

  const onSubmit = data => {
    // Ici, ajouter la logique d'enregistrement (API ou Redux)
    alert('Cours ajouté !\n' + JSON.stringify(data, null, 2));
    navigate('/cd');
  };

  // Filtrage pour recherche élève
  const filteredEleves = elevesData.filter(e =>
    e.nom.toLowerCase().includes(searchEleve.toLowerCase())
  );
  // Filtrage pour recherche enseignant
  const filteredEnseignants = enseignantsData.filter(e =>
    e.nom.toLowerCase().includes(searchEnseignant.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Entete />
      <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">Nouveau cours à domicile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                ? elevesData.find(e => String(e.id) === String(selectedEleveId))?.nom
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
                {filteredEleves.length === 0 && (
                  <div className="px-3 py-2 text-gray-400 text-sm">Aucun élève trouvé</div>
                )}
                {filteredEleves.map(eleve => (
                  <div
                    key={eleve.id}
                    className={`px-3 py-2 hover:bg-purple-50 cursor-pointer text-sm ${selectedEleveId === String(eleve.id) ? "bg-purple-100 font-semibold" : ""}`}
                    onClick={() => {
                      setValue("eleve", eleve.id);
                      setShowEleveDropdown(false);
                    }}
                    tabIndex={-1}
                  >
                    {eleve.nom}
                  </div>
                ))}
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
                ? enseignantsData.find(e => String(e.id) === String(watch("enseignant")))?.nom
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
                    key={ens.id}
                    className={`px-3 py-2 hover:bg-purple-50 cursor-pointer text-sm ${watch("enseignant") === String(ens.id) ? "bg-purple-100 font-semibold" : ""}`}
                    onClick={() => {
                      setValue("enseignant", ens.id);
                      setShowEnseignantDropdown(false);
                    }}
                    tabIndex={-1}
                  >
                    {ens.nom}
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
          {/* Agence */}
          <select {...register("inscritPar", { required: true })} className="border rounded px-3 py-2">
            <option value="">Sélectionner l'agence</option>
            <option value="Agence Bouaké">Agence Bouaké</option>
            <option value="Agence Abidjan">Agence Abidjan</option>
            <option value="Agence San Pedro">Agence San Pedro</option>
          </select>
          {errors.inscritPar && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mt-4">Enregistrer</button>
        </form>
      </div>
    </div>
  );
}
