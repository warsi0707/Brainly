import React, { useState } from 'react'
import {BackendUrl} from"../Utils/BackendUrl"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Signin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const backendUrl = BackendUrl
  const navigate = useNavigate()
 
  const Signin = async(e)=>{
    e.preventDefault()
    const response = await fetch(`${backendUrl}/api/v1/signin`,{
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    const result = await response.json()
    console.log(result)
    if(response.ok){
      setUsername("")
      setPassword("")
      setMessage(result.message)
      setTimeout(() => {
        setMessage("")
        navigate("/")
      }, 2000);
    }
      setError(result.message)
    
  }
  return (
    <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
        <div className='bg-white min-w-72  rounded-xl p-3 '>
            <div className='mt-5 flex flex-col gap-5'> 
                <input value={username} onChange={(e)=> setUsername(e.target.value)} className='w-full text-center p-2 border-2 border-gray-100 rounded-lg text-xl' type="text" placeholder='Username' />
                <input value={password} onChange={(e)=> setPassword(e.target.value)}  className='w-full text-center p-2 border-2 border-gray-100 rounded-lg text-xl' type="password" placeholder='Password' />
                <button onClick={Signin} className='bg-purple-500  py-1 rounded-md text-lg hover:bg-sky-600 hover:text-white hover:cursor-pointer transition-all delay-200'>Signin</button>
            </div>  
        </div>
        {message &&
         <div className='fixed bottom-16 right-16 bg-green-400 w32 px-16 py-2 text-2xl text-white rounded-lg transition-all duration-300 ease-in-out'>
         <h1>{message}</h1>
       </div>
        }
        {error &&
         <div className='fixed bottom-16 right-16 bg-green-400 w32 px-16 py-2 text-2xl text-white rounded-lg transition-all duration-300 ease-in-out'>
         <h1>{error}</h1>
       </div>
        }
    </div>
  )
}
