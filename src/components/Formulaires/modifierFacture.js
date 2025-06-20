import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { comptabiliteActions } from '../../reducer/comptabilite';
import { userActions } from '../../reducer/user';
import { useForm } from 'react-hook-form';
import moment from 'moment';

export default function ModifierFacture({ retour, value }) {
  const [chargement, setChargement] = useState(false)
  const [mois, setMois] = useState(() => {
    // Initialiser avec le mois de la période si possible
    if (value.periodeAjouter) {
      const [moisStr, anneeStr] = value.periodeAjouter.split(' ');
      const moisNum = moment().month(moisStr).format("MM");
      return moisNum || "";
    }
    return "";
  });
  const [annee, setAnnee] = useState(() => {
    if (value.periodeAjouter) {
      const [moisStr, anneeStr] = value.periodeAjouter.split(' ');
      return anneeStr || "";
    }
    return "";
  });

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      montant: value.montant,
    }
  });
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userActions.listeParent())
  }, [dispatch])

  const { isLoader, parents } = useSelector((state) => state.userReducer);

  const onSubmit = (data) => {
    // Construit la période sous forme "Mois Année"
    let periodeAjouter = "";
    if (mois && annee) {
      const moisNom = moment().month(Number(mois) - 1).format("MMMM");
      periodeAjouter = `${moisNom.charAt(0).toUpperCase() + moisNom.slice(1)} ${annee}`;
    }
    setChargement(true)
    dispatch(comptabiliteActions.modifierFacture({
      ...value,
      montant: data.montant,
      periodeAjouter: periodeAjouter
    })).then(() => {
      setChargement(false)
      retour()
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-sm border p-6 bg-white border-gray-100 shadow-xl rounded-2xl z-50
        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        sm:static sm:translate-x-0 sm:translate-y-0 sm:mx-auto sm:my-10
        flex flex-col'
      style={{ maxWidth: 350 }}
    >
      <div className='flex flex-row justify-between items-center mb-4'>
        <div className='font-bold text-xl text-blue-700'>
          Modifier la facture
        </div>
        <div className='font-medium text-sm text-green-500'>
          N° {value._id.slice(value._id.length - 3)}
        </div>
      </div>
      <div className='flex flex-row justify-between items-center mb-4'>
        <div>
          <div className='text-base font-semibold text-gray-700'>
            {value.client?.nom} {value.client?.prenoms}
          </div>
          <div className='text-xs text-gray-500'>{value.client?.cel}</div>
        </div>
        <div className='text-right'>
          <div className='font-bold text-lg text-blue-600'>{value.montant} FCFA</div>
          <div className='text-xs text-gray-400'>Montant prestation</div>
        </div>
      </div>

      <div className='mb-4'>
        <label className="block text-sm font-medium text-gray-700 mb-1">Montant</label>
        <input
          {...register("montant", { required: true })}
          type="number"
          className='w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
          placeholder='Montant prestation'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Période (mois et année)</label>
        <input
          type="month"
          value={mois && annee ? `${annee}-${mois.padStart(2, '0')}` : ""}
          onChange={e => {
            const [y, m] = e.target.value.split('-')
            setMois(m)
            setAnnee(y)
          }}
          className='w-full border rounded-lg px-3 py-2 text-sm bg-gray-100'
          required
        />
      </div>

      <div className='flex flex-row justify-center gap-6 mt-6'>
        <button
          onClick={() => retour()}
          type="button"
          className="text-blue-700 hover:text-blue-800 border-r font-medium text-sm px-5 py-2.5 text-center"
        >
          Retour
        </button>
        {chargement === false ? (
          <button
            type='submit'
            className='font-medium text-md text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg shadow'
          >
            <span>Modifier</span>
          </button>
        ) : (
          <span className='flex flex-row items-center space-x-2 justify-center px-3 py-2 text-md font-medium text-center text-blue-600'>
            <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            Loading...
          </span>
        )}
      </div>
    </form>
  )
}
