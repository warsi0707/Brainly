import React from 'react'

export default function ErrorMessage({message}) {
  return (
    <div>
        <div className="fixed bottom-16 right-16 bg-green-400 px-5  sm:px-10 sm:py-1.5 sm:text-xl text-gray-800 rounded-lg transition-all duration-300 ease-in-out">
            <h1>{message}</h1>
        </div> 
    </div>
  )
}
