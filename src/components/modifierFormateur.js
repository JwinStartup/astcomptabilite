import React from 'react'

export default function ModifierFormateur({retour}) {
  return (
    <div className='w-[500px] space-y-4 h-[200px]  items-center justify-center  border p-3 bg-white border-gray-100 shadow-md rounded-3xl   z-10 absolute top-[125px] left-[400px]'>
    <div className='font-bold  tracking-tight text-[22px] text-black pl-1'>Modifier Formateur</div>
    <div className='flex flex-row gap-3 w-full items-center justify-center '>
        <p className='font-semibold text-gray-500 tracking-tight text-[18px] text-center' >AKOU JEAN PAUL  </p>
    <p className='font-medium text-gray-500  tracking-tight text-[18px] text-center' >Litterature </p>
    <p className='  rounded-full bg-red-400 flex items-center p-2  justify-center font-medium tracking-tight text-[14px] ml-3 text-center' > supprimer  </p>
    </div>

    <div className='flex flex-col items-center  w-full h-full '>
    <div className='flex flex-row space-x-6 mt-2'>  <button onClick={()=>retour()} type="button" className="text-white bg-red-700 hover:bg-red-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ">
    Retour
    
    </button>
    
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Ajouter un formateur
   
    </button> </div>
    </div>
</div>
  )
}
