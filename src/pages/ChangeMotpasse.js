import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { userActions } from '../reducer/user';

const ChangeMotpasse = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { chargement } = useSelector(state => state.user);
    
    const onSubmit = (data) => {
        dispatch(userActions.changerMotPasse({id: id, ...data}))
            .then(() => {
                alert('Mot de passe changé avec succès !');
                reset();
                navigate('/profil');
            })
            .catch(() => {
                alert('Erreur lors du changement de mot de passe');
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
                <div className="px-6 py-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Changer le mot de passe</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Saisissez votre ancien mot de passe et le nouveau
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mot de passe actuel
                            </label>
                            <input
                                type="password"
                                {...register('ancienMotPasse', { required: 'Ce champ est requis' })}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder="Saisissez votre mot de passe actuel"
                            />
                            {errors.ancienMotPasse && (
                                <p className="mt-1 text-sm text-red-600">{errors.ancienMotPasse.message}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                {...register('nouveauMotPasse', { 
                                    required: 'Ce champ est requis', 
                                    minLength: { value: 6, message: 'Minimum 6 caractères' } 
                                })}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder="Saisissez votre nouveau mot de passe"
                            />
                            {errors.nouveauMotPasse && (
                                <p className="mt-1 text-sm text-red-600">{errors.nouveauMotPasse.message}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmer le nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                {...register('confirmerMotPasse', {
                                    required: 'Ce champ est requis',
                                    validate: value => value === watch('nouveauMotPasse') || 'Les mots de passe ne correspondent pas'
                                })}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder="Confirmez votre nouveau mot de passe"
                            />
                            {errors.confirmerMotPasse && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmerMotPasse.message}</p>
                            )}
                        </div>
                        
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/profil')}
                                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={chargement}
                                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {chargement ? 'Changement...' : 'Changer le mot de passe'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangeMotpasse;