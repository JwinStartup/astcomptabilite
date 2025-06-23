import React from 'react';
import Entete from '../components/entete.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function FormCoursDomicile() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    // Ici, ajouter la logique d'enregistrement (API ou Redux)
    alert('Cours ajouté !');
    navigate('/cd');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Entete />
      <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">Nouveau cours à domicile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input {...register("eleve", { required: true })} placeholder="Nom de l'élève" className="border rounded px-3 py-2" />
          {errors.eleve && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          <input {...register("enseignant", { required: true })} placeholder="Nom de l'enseignant" className="border rounded px-3 py-2" />
          {errors.enseignant && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          <input {...register("parent", { required: true })} placeholder="Nom du parent" className="border rounded px-3 py-2" />
          {errors.parent && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          <input {...register("classe", { required: true })} placeholder="Classe" className="border rounded px-3 py-2" />
          {errors.classe && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          <input {...register("matiere", { required: true })} placeholder="Matière" className="border rounded px-3 py-2" />
          {errors.matiere && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          <input {...register("prix", { required: true })} placeholder="Prix" className="border rounded px-3 py-2" />
          {errors.prix && <span className="text-red-500 text-xs">Ce champ est requis</span>}
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
