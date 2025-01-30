import React, { useContext,useState } from 'react'
import SidebarIcon from './SidebarIcon'
import { Link, useNavigate } from 'react-router-dom'
import userAuthContext from '../context/authContext'
import { BackendUrl } from '../Utils/BackendUrl'

export default function SideBar() {
  const {isLogin,setIsLogin } = useContext(userAuthContext)
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const Logout =async()=>{
    const response = await fetch(`${BackendUrl}/api/v1/logout`,{
      method: "POST",
      credentials: 'include'
    })
    const result = await response.json()
    if(response.ok){
      setIsLogin(false)
      setMessage(result.message)
      setTimeout(() => {
        navigate("/signin")
        setMessage("")
      }, 2000);
    }
  }
  return (
    <div className='h-full  w-72 bg-gray-300 border-r-1 border-gray-400 p-4'>
        <div className="heading mt-3 text-3xl flex gap-2">
            <i className="fa-solid fa-brain mt-1"></i>
            <h1>Brainly</h1>
        </div>
        <div className='flex flex-col gap-10 '>
        <div className="content mt-10 ml-5 ">
            <SidebarIcon title={"Twiiter"} icon={<i className="fa-brands fa-twitter mt-1"></i>}/>
            <SidebarIcon title={"Videos"} icon={<i className="fa-brands fa-youtube"></i>}/>
            <SidebarIcon title={"Documents"} icon={<i className="fa-solid fa-file"></i>}/>
            <SidebarIcon title={"Links"} icon={<i className="fa-solid fa-link"></i>}/>
            <SidebarIcon title={"Tags"} icon={<i className="fa-solid fa-hashtag"></i>}/>
        </div>
        <div className=' mt-10 ml-10 flex gap-2 '>   
          {isLogin? <button onClick={Logout}  className='bg-red-500 py-2 px-3 rounded-md text-black hover:cursor-pointer hover:bg-gray-100 transition-all duration-300'>Logout</button>: 
          <>
          <Link to={"/signin"}><button  className='bg-white py-2 px-3 rounded-md text-black hover:cursor-pointer hover:bg-gray-100 transition-all duration-300'>Login</button> </Link><Link to={"/signup"}><button className='bg-blue-600 py-2 px-3 rounded-md text-white hover:cursor-pointer hover:bg-blue-500 transition-all duration-300'>Join Now</button></Link> </>}
        </div>
        </div>
        
    </div>
  )
}
