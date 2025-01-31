import  { useState } from "react";
import { BackendUrl } from "../Utils/BackendUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const backendUrl = BackendUrl;
  const navigate = useNavigate();

  const Signup = async () => {
    const response = await fetch(`${backendUrl}/api/v1/signup`,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    });
    const result = await response.json()
    if (response.ok) {
      setMessage();
      setMessage(result.message);
      setTimeout(() => {
        setMessage("");
        navigate("/signin");
      }, 2000);
    }else{
      setMessage(result.message)
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white min-w-72  rounded-xl p-3 ">
        <div className="mt-5 flex flex-col gap-5">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-center p-2 border-2 border-gray-100 rounded-lg text-xl"
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-center p-2 border-2 border-gray-100 rounded-lg text-xl"
            type="password"
            placeholder="Password"
          />
          <button
            onClick={Signup}
            className="bg-blue-500  py-1 rounded-md text-lg hover:bg-sky-600 text-white hover:cursor-pointer transition-all delay-150"
          >
            Signup
          </button>
        </div>
      </div>
      {message && <ErrorMessage message={message}/>}
    </div>
  );
}
