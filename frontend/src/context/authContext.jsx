import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BackendUrl } from "../Utils/BackendUrl";

const userAuthContext = createContext()

export  function UserAuth({children}){
    const  [isLogin, setIsLogin] = useState(false)
    try{
        const GetUser =async()=>{
            const response = await axios.get(`${BackendUrl}/api/v1/auth-check`,{
                withCredentials: true
            })
            if(response.data.isLogin == true){
                setIsLogin(true)
            }else{
                setIsLogin(false)
            }
        }
        useEffect(()=>{
            setInterval(() => {
                GetUser() 
            }, 2*1000);
        },[])
    }catch(e){
        console.error(e)
    }
    
   return (
    <div>
    <userAuthContext.Provider value={{isLogin, setIsLogin}}>
        {children}
    </userAuthContext.Provider>
    </div>
   )
}

export  default userAuthContext
