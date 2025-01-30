import React from 'react'


export default function AddButton({onClose}) {
  return (
    <div onClick={onClose} className='bg-blue-800 text-white w-32 flex space-x-2 py-2 justify-center  rounded-md hover:bg-blue-500 hover:cursor-pointer'>
      <i className="fa-solid fa-plus mt-1"></i>
      <h1 className='flex flex-col'>Add content</h1>
    </div>
  )
}
