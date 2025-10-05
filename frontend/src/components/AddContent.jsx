import { memo, useContext } from "react";
import { BackendUrl } from "../Utils/BackendUrl";
import { useNavigate } from "react-router-dom";
import AddInput from "./AddInput";
import toast from "react-hot-toast";
import { useState } from "react";
import AuthContext from "../context/authContext";

function AddContnet({handleClose}) {
  const {getContent} = useContext(AuthContext)
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate();

  const handlePostContent = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${BackendUrl}/user/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({ link, type, title, description }),
      });
      const result = await response.json();
      if (response.status ==200) {
        getContent()
        toast.success(result.message);
        handleClose(true)
        // setTimeout(() => {
        //   navigate("/");
        // }, 2000);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen w-screen fixed top-0 bg-black/70 backdrop-blur-xl flex justify-center items-center">
      <div className="bg-white w-96 py-5 p-3 rounded-md">
        <div className="flex  justify-between">
          <h1 className="text-2xl">Post Your Content</h1>
          <button onClick={handleClose} className="text-xl cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
        </div>
        <div className="flex flex-col gap-2">
          <AddInput vale={title} handleChange={(e)=> setTitle(e.target.value)} label={"Title"} type={'text'} placeholder={'Title'}/>
          <AddInput vale={link} handleChange={(e)=> setLink(e.target.value)} label={"Link"} type={'text'} placeholder={'Past your link'}/>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Select type</label>
            <select value={type} onChange={(e)=> setType(e.target.value)} className="w-full p-2 border rounded-md">
              <option value="">Select type</option>
              <option value="TEXT">TEXT</option>
              <option value="TWITTER">TWITTER</option>
              <option value="YOUTUBE">YOUTUBE</option>
              <option value="LINK">LINK</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Your Content</label>
            <textarea value={description} onChange={(e)=> setDescription(e.target.value)} className="border p-2 rounded-md" name="" rows={5} id=""></textarea>
          </div>
          <button onClick={handlePostContent} className="bg-black text-white p-2 w-full rounded-md cursor-pointer">Post</button>
        </div>
       
      </div>
    </div>
  );
}
export default memo(AddContnet);
