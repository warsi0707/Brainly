import  { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BackendUrl } from '../Utils/BackendUrl'
import { useParams } from 'react-router-dom'
import SharedCard from '../components/SharedCard'

export default function SingleContent() {
    const [data, setData] = useState({})
    const {id} = useParams()
    console.log(data)
    const handleGetContent =async()=>{
        try{
            const response = await fetch(`${BackendUrl}/content/${id}`, {
                method: 'GET'
            })
            const result = await response.json()
            if(response.status ==200){
                setData(result.content)
            }
        }catch(error){
            toast.error("failed")
        }
    }
    useEffect(()=>{
        handleGetContent()
    },[])
  return (
    <div className='w-full min-h-screen'>
        <div className='w-full flex justify-center items-center py-5'>
            {data && <SharedCard item={data}/>}
        </div>
     
    </div>
  )
}
