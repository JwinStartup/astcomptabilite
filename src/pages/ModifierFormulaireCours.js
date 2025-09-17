import React, { useEffect, useState } from 'react';
import Entete from '../components/entete.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { comptabiliteActions } from '../reducer/comptabilite.js';
import { userActions } from '../reducer/user.js';
import { IoIosArrowDropleftCircle } from "react-icons/io";

const matieresData = [
 "Primaire","EDHC", "Mathématiques", "Physique", "Français", "Anglais", "SVT", "Histoire", "Géographie", "Philosophie", "Informatique", "Comptabilité", "Economie","Musique","Arts","Autre"
];

const classesData = [
  "Cp1", "Cp2", "Ce1", "Ce2", "Cm1", "Cm2",
  "6eme", "5eme", "4eme", "3eme",
  "2ndA", "2ndC", "1ereC", "1ereD", "1ereA",
  "TleC", "TleD", "TleA","LICENCE1", "LICENCE2", "LICENCE3","MASTER1", "MASTER2","AUTRE"
];
const anneeAcademiqueData = ["2024-2025", "2025-2026", "2026-2027"];

export default function ModifierFormulaireCours() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, setValue, control, watch, reset } = useForm();
  const [searchEleve, setSearchEleve] = useState('');
  const [showEleveDropdown, setShowEleveDropdown] = useState(false);
  const [searchFormateur, setSearchFormateur] = useState('');
  const [showFormateurDropdown, setShowFormateurDropdown] = useState(false);
  const [selectedMatieres, setSelectedMatieres] = useState([]);
  const [anneeAcademique, setAnneeAcademique] = useState("");
  const [chargement, setChargement] = useState(false);
  const [coursData, setCoursData] = useState(null);
  const dispatch = useDispatch();
       
  useEffect(() => { 
    dispatch(userActions.listeEnfant());
    dispatch(userActions.listePersonnel());
  }, [dispatch]);

  // Charger les données du cours à modifier
  useEffect(() => {
    if (id) {
      setChargement(true);
      dispatch(comptabiliteActions.getCoursById(id))
        .then((result) => {
          const cours = result.payload;
          setCoursData(cours);
          // Préremplir le formulaire avec les données existantes
          reset({
            eleve: cours.eleve?._id,
            parent: `${cours.parent?.nom} ${cours.parent?.prenoms}`,
            parentId: cours.parent?._id,
            formateur: cours.formateur?._id,
            classe: cours.classe,
            prix: cours.prix,
            commission: cours.commission,
            anneeAcademique: cours.anneeAcademique
          });
          setAnneeAcademique(cours.anneeAcademique);
          setSelectedMatieres(Array.isArray(cours.matieres) ? cours.matieres : [cours.matieres]);
          setChargement(false);
        })
        .catch(() => {
          alert('Erreur lors du chargement du contrat');
          setChargement(false);
          navigate('/cd');
        });
    }
  }, [id, dispatch, reset, navigate]);

  const { isLoader, enfants, personnels } = useSelector((state) => {
    return state.userReducer;
  });

  // Pour remplir automatiquement le parent
  const selectedEleveId = watch("eleve");
  useEffect(() => {
    const eleve = enfants.find(e => String(e._id) === String(selectedEleveId));
    if (eleve) {
      setValue("parent", eleve?.parent?.nom + " " + eleve?.parent?.prenoms);
      setValue("parentId", eleve?.parent?._id);
    } else {
      setValue("parent", "");
      setValue("parentId", "");
    }
  }, [selectedEleveId, setValue, enfants]);

  // Pour l'affichage de l'année académique sélectionnée
  useEffect(() => {
    setValue("anneeAcademique", anneeAcademique);
  }, [anneeAcademique, setValue]);

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
    console.log('Données de modification du contrat:', data);
    setChargement(true);
    
    // Envoyer les données modifiées à l'API
    dispatch(comptabiliteActions.updateCours({ id, data }))
      .then(() => {
        alert('Contrat modifié avec succès !');
        navigate('/cd');
      })
      .catch(err => {
        console.error('Erreur lors de la modification du contrat:', err);
        alert('Erreur lors de la modification du contrat. Veuillez réessayer.');
      })
      .finally(() => {
        setChargement(false);
      });
  };

  // Filtrage pour recherche élève
  const filteredEleves = enfants.filter(e =>
    e.nom.toLowerCase().includes(searchEleve.toLowerCase())
  );
  
  // Filtrage pour recherche formateur
  const filteredFormateurs = personnels.filter(e =>
    e.nom.toLowerCase().includes(searchFormateur.toLowerCase())
  );

  if (chargement) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du contrat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Entete />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/cd')}>
          <IoIosArrowDropleftCircle size={30} className="text-purple-700" />
          <h5 className="text-xl font-bold tracking-tight text-gray-900">Retour aux contrats</h5>
        </div>
        
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-6 text-purple-700">Modifier le contrat</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Année académique */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Année Académique</label>
              <select
                value={anneeAcademique}
                onChange={(e) => setAnneeAcademique(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner l'année académique</option>
                {anneeAcademiqueData.map((annee, index) => (
                  <option key={index} value={annee}>{annee}</option>
                ))}
              </select>
            </div>

            {/* Recherche Élève */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Élève</label>
              <input
                type="text"
                value={searchEleve}
                onChange={(e) => {
                  setSearchEleve(e.target.value);
                  setShowEleveDropdown(true);
                }}
                onFocus={() => setShowEleveDropdown(true)}
                placeholder="Rechercher un élève..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {showEleveDropdown && filteredEleves.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                  {filteredEleves.map((eleve) => (
                    <div
                      key={eleve._id}
                      onClick={() => {
                        setValue("eleve", eleve._id);
                        setSearchEleve(eleve.nom + " " + eleve.prenoms);
                        setShowEleveDropdown(false);
                      }}
                      className="p-2 hover:bg-purple-50 cursor-pointer border-b border-gray-100"
                    >
                      {eleve.nom} {eleve.prenoms}
                    </div>
                  ))}
                </div>
              )}
              <input type="hidden" {...register("eleve", { required: "Veuillez sélectionner un élève" })} />
              {errors.eleve && <p className="text-red-500 text-sm mt-1">{errors.eleve.message}</p>}
            </div>

            {/* Parent (auto-rempli) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent</label>
              <input
                type="text"
                {...register("parent")}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                placeholder="Parent automatiquement sélectionné"
              />
              <input type="hidden" {...register("parentId")} />
            </div>

            {/* Recherche Formateur */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Formateur</label>
              <input
                type="text"
                value={searchFormateur}
                onChange={(e) => {
                  setSearchFormateur(e.target.value);
                  setShowFormateurDropdown(true);
                }}
                onFocus={() => setShowFormateurDropdown(true)}
                placeholder="Rechercher un formateur..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {showFormateurDropdown && filteredFormateurs.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                  {filteredFormateurs.map((formateur) => (
                    <div
                      key={formateur._id}
                      onClick={() => {
                        setValue("formateur", formateur._id);
                        setSearchFormateur(formateur.nom + " " + formateur.prenoms);
                        setShowFormateurDropdown(false);
                      }}
                      className="p-2 hover:bg-purple-50 cursor-pointer border-b border-gray-100"
                    >
                      {formateur.nom} {formateur.prenoms}
                    </div>
                  ))}
                </div>
              )}
              <input type="hidden" {...register("formateur", { required: "Veuillez sélectionner un formateur" })} />
              {errors.formateur && <p className="text-red-500 text-sm mt-1">{errors.formateur.message}</p>}
            </div>

            {/* Classe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
              <select
                {...register("classe", { required: "Veuillez sélectionner une classe" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Sélectionner une classe</option>
                {classesData.map((classe, index) => (
                  <option key={index} value={classe}>{classe}</option>
                ))}
              </select>
              {errors.classe && <p className="text-red-500 text-sm mt-1">{errors.classe.message}</p>}
            </div>

            {/* Matières */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Matières</label>
              <div className="grid grid-cols-2 gap-2 p-3 border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
                {matieresData.map((matiere, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMatieres.includes(matiere)}
                      onChange={() => handleMatiereCheck(matiere)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">{matiere}</span>
                  </label>
                ))}
              </div>
              {selectedMatieres.length === 0 && (
                <p className="text-red-500 text-sm mt-1">Veuillez sélectionner au moins une matière</p>
              )}
            </div>

            {/* Prix */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA)</label>
              <input
                type="number"
                {...register("prix", { required: "Veuillez saisir le prix", min: { value: 0, message: "Le prix doit être positif" } })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ex: 25000"
              />
              {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix.message}</p>}
            </div>

            {/* Commission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commission (FCFA)</label>
              <input
                type="number"
                {...register("commission", { required: "Veuillez saisir la commission", min: { value: 0, message: "La commission doit être positive" } })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ex: 5000"
              />
              {errors.commission && <p className="text-red-500 text-sm mt-1">{errors.commission.message}</p>}
            </div>

            {/* Boutons */}
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/cd')}
                className="flex-1 py-3 px-6 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={chargement || selectedMatieres.length === 0}
                className="flex-1 py-3 px-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {chargement ? 'Modification...' : 'Modifier le contrat'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
