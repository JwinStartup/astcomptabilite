import React from 'react';
import Entete from '../src/components/entete.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function FormulaireCreerFacture() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eleveParam = params.get('eleve') || '';

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      eleve: eleveParam,
      montant: '',
      description: ''
    }
  });

  const onSubmit = data => {
    // Ici, ajouter la logique d'enregistrement (API ou Redux)
    alert('Facture créée !');
    navigate('/cd');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Entete />
      <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Créer une facture</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input {...register("eleve", { required: true })} placeholder="Nom de l'élève" className="border rounded px-3 py-2" />
          {errors.eleve && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          <input {...register("montant", { required: true })} placeholder="Montant" className="border rounded px-3 py-2" />
          {errors.montant && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          <input {...register("description", { required: true })} placeholder="Description" className="border rounded px-3 py-2" />
          {errors.description && <span className="text-red-500 text-xs">Ce champ est requis</span>}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4">Enregistrer la facture</button>
        </form>
      </div>
    </div>
  );
}
