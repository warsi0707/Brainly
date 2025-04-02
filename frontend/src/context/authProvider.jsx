import { useCallback, useEffect, useState } from "react"
import { BackendUrl } from "../Utils/BackendUrl"
import AuthContext from "./authContext"
import toast from "react-hot-toast"

export default function AuthProvider({children}) {
    const [authenticated, setAuthenticated] = useState(false)

    const VerifyUserLogin =useCallback(async()=>{
      try{
        const response = await fetch(`${BackendUrl}/api/v1/user/auth`,{
          method: "GET", 
          credentials: 'include'
      })
      const result = await response.json()
      if(result.authenticated == true){
          setAuthenticated(true)
      }else{
          setAuthenticated(false)
      }
      }catch(error){
        toast.error(error.message)
      }  
    },[])
    useEffect(()=>{
        VerifyUserLogin()
    },[])
  return (
    <div>
      <AuthContext.Provider value={{authenticated, setAuthenticated}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}
