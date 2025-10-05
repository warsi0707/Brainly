import { memo, useContext } from "react";
import YoutubeEmbed from "./YoutubeEmbed";
import TwitterEmbed from "./TwitterEmbed";
import toast from "react-hot-toast";
import { BackendUrl } from "../Utils/BackendUrl";
import AuthContext from "../context/authContext";

function Card({item}) {
  const {getContent} = useContext(AuthContext)
  const handleDeleteTask =async(id)=>{
    try{
      const response = await fetch(`${BackendUrl}/user/content/${id}`,{
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      const result = await response.json()
      if(response.status ==200){
        toast.success(result.message)
        getContent()
      }else{
        toast.error(result.error)
      }
    }catch(error){
      toast.error("Failed")
    }
  }
  return (
    <div className={`${item.type === 'YOUTUBE' && "h-72 py-3 flex flex-col  gap-2 p-2"} ${item.type === 'TEXT' && "w-72 h-72 p-3 flex flex-col justify-between"} ${item.type === 'TWITTER' && "py-3 h-96 overflow-hidden max-h-[600px] flex flex-col gap-5 p-2"}  bg-gray-200 border-2 border-black shadow-md    rounded-md `}>
      <div className={`${item.type === 'YOUTUBE' && "flex flex-col gap-2"}`}>
        <div className="flex gap-2">
          <p>
            {item.type ==='TEXT' && <i className="fa-solid fa-note-sticky"></i>}
            {item.type ==='TWITTER' && <i className="fa-brands fa-x-twitter"></i>}
            {item.type ==='YOUTUBE' && <i className="fa-brands fa-youtube"></i>}
            {item.type ==='LINK' && <i className="fa-solid fa-link"></i>}
          </p>
          <p>{item.title}</p>
        </div>
        {item.type ==='TEXT' &&
        <p>{item.description}</p>}

        {item.type ==='YOUTUBE' &&
           <div >
           <YoutubeEmbed link={item.link}/>
           <p className="py-2">{item.description}</p>
          </div>
        }
        {item.type ==='TWITTER' &&
           <div className="  ">
           <TwitterEmbed link={item.link} />
          </div>
        }
        
        
      </div>
      <div className="flex justify-between  gap-2">
        <div className="flex gap-1 items-end">
          <img src="/user.png" className="w-5 h-5 md:w-8 md:h-8 rounded-full" alt="" />
          <p>{item.userId.username}</p>
        </div>
        <div className="flex gap-5">
            <button className="cursor-pointer md:text-xl"><i className="fa-solid fa-pen-to-square"></i></button>
            <button onClick={()=> handleDeleteTask(item._id)} className="cursor-pointer md:text-xl"><i className="fa-solid fa-trash"></i></button>
        </div>
        
      </div>
    </div>
  );
}
export default memo(Card);
