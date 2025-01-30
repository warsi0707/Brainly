import axios from "axios"
import { useEffect, useState } from "react"
import { BackendUrl } from "../Utils/BackendUrl"

export default function useContent(){
    const [contents, setContnents] = useState([])
    const GetData =async()=>{
        const response = await axios.get(`${BackendUrl}/api/v1/content`,{
            withCredentials: true
        })
        setContnents(response.data.content)
    }
   useEffect(()=>{
        GetData()
        let interval = setInterval(() => {
            GetData()
        }, 5*1000);
        return ()=> {
            clearInterval(interval)
        } 
        // clearInterval(interval)
   },[])
    return contents
}