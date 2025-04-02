import { useCallback } from "react"
import { BackendUrl } from "../Utils/BackendUrl"
import toast from "react-hot-toast"

export default  function useDeleteContent() {
      const DeleteContent =useCallback(async(id)=>{
        try{
          const response = await fetch(`${BackendUrl}/api/v1/content/${id}`,{
            method: "DELETE",
            credentials: 'include'
          })
          const result = await response.json()
          if(response.ok){
            toast.success(result.message)
          }else{
            toast.error(result.message)
          }
        }catch(error){
          toast.error(error.message)
        }
      },[])
  return (
    DeleteContent
  )
}
