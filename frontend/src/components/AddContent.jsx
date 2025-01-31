import { useState } from "react";
import { BackendUrl } from "../Utils/BackendUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

export default function AddContnet({ open, onClose }) {
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const backendUrl = BackendUrl;
  const AddData = async () => {
    const response = await fetch(`${backendUrl}/api/v1/content`,{
      credentials: 'include',
      method: 'POST',
      headers : {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({link, type, title})
    })
    const result = await response.json()
    console.log(result)
    if (response) {
      setLink("");
      setType("");
      setTitle("");
      setMessage(result.message);
      setTimeout(() => {
        setMessage("")
        navigate("/")
      }, 2000);
      
    }else{
      setMessage(result.message)
      setTimeout(() => {
        setMessage("")
      }, 2000);
    }
  };
  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500 flex justify-center opacity-60"></div>
          <div className="w-screen h-screen fixed top-0 left-0  flex justify-center ">
            <div className="flex flex-col justify-center">
              <span className="bg-white w-72 opacity-100 p-3 rounded-xl">
                <div className="flex justify-end">
                  <div className="hover:cursor-pointer text-2xl">
                    <i onClick={onClose} className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <div className=" flex flex-col gap-2 mt-3">
                  <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="p-2 rounded-md"
                    type="text"
                    placeholder="Link"
                  />
                  <input
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="p-2 rounded-md"
                    type="text"
                    placeholder="Twitter | Youtube | Text"
                  />
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 rounded-md"
                    type="text"
                    placeholder="Title"
                  />
                  <button
                    onClick={AddData}
                    className="bg-sky-300 p-2 text-white rounded-md hover:cursor-pointer hover:bg-sky-400 transition-all duration-300 text-xl"
                  >
                    Submit
                  </button>
                </div>
              </span>
            </div>
            {message && (
              <ErrorMessage message={message}/>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
