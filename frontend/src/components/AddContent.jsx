import { useState } from "react"
import { BackendUrl } from "../Utils/BackendUrl"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function AddContnet({open, onClose}){
    const [link, setLink] = useState("")
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const backendUrl = BackendUrl
    const AddData =async()=>{
        const response = await axios.post(`${backendUrl}/api/v1/content`,{
            link, type, title
        },{
            withCredentials: true
        }
        )
        onclose()
        if(response){
            setMessage(response.data.message)
            // navigate("/dashboard")
            setLink("")
            setType("")
            setTitle("")
           
        }  
    }
    return (
        <div>
            {open && <div>
                <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500 flex justify-center opacity-60"></div>
            <div className="w-screen h-screen fixed top-0 left-0  flex justify-center ">
                <div className="flex flex-col justify-center">
                <span className="bg-white w-72 opacity-100 p-3 rounded-xl">
                    <div  className="flex justify-end">
                        <div  className="hover:cursor-pointer text-2xl"><i onClick={onClose} className="fa-solid fa-xmark"></i></div>
                    </div>
                    <div className=" flex flex-col gap-2 mt-3">
                        <input value={link} onChange={(e)=> setLink(e.target.value)} className="p-2 rounded-md" type="text"  placeholder="Link"/>
                        <input value={type} onChange={(e)=> setType(e.target.value)}  className="p-2 rounded-md" type="text"  placeholder="Twitter | Youtube | Text"/>
                        <input value={title} onChange={(e)=> setTitle(e.target.value)}  className="p-2 rounded-md" type="text"  placeholder="Title"/>
                        <button onClick={AddData} className="bg-sky-300 p-2 text-white rounded-md hover:cursor-pointer text-xl">Submit</button>
                    </div>
                </span>
                </div>
                {message && 
                <div className='fixed bottom-16 right-16 bg-green-400 w32 px-16 py-2 text-2xl text-white rounded-lg transition-all duration-300 ease-in-out'>
                    <h1>{message}</h1>
                </div>
                }
            </div>
            </div>
            
            }
            
        </div>
    )
}


