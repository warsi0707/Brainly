import {  useEffect, useState } from "react"
import { BackendUrl } from "../Utils/BackendUrl"
import AuthContext from "./authContext"
import toast from "react-hot-toast"

export default function AuthProvider({children}) {
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState()
    const [data, setData] = useState([])

    const VerifyUserLogin =async()=>{
      try{
        const response = await fetch(`${BackendUrl}/user/auth`,{
          method: "GET", 
          headers: {
            token : localStorage.getItem('token')
          }
      })
      const result = await response.json()
      if(response.status ==200){
        setUser(result.user)
        setAuthenticated(true)
      }else{
          setAuthenticated(false)
      }
      }catch(error){
        toast.error(error.message)
      }  
    };
    const getContent =async()=>{
      try{
        const response = await fetch(`${BackendUrl}/user/content`,{
          headers: {
            token : localStorage.getItem('token')
          }
        })
        const result = await response.json()
        if(response.status ==200){
          setData(result.contents)
        }else{
          setData([])
        }
      }catch(error){
        console.error(error)
      }
    }
    useEffect(()=>{
        VerifyUserLogin()
        getContent()
    },[authenticated])
  return (
    <div>
      <AuthContext.Provider value={{authenticated, setAuthenticated,data, setData, user,setUser,getContent}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}
