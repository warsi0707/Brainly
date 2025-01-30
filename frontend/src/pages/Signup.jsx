import  { useState } from "react";
import { BackendUrl } from "../Utils/BackendUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const backendUrl = BackendUrl;
  const navigate = useNavigate();

  const Signup = async () => {
    const response = await axios.post(`${backendUrl}/api/v1/signup`, {
      username,
      password,
    });
    if (response.statusText == "OK") {
      setMessage();
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
        navigate("/signin");
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
      {message && (
        <div className="fixed bottom-16 right-16 bg-green-400 w32 px-16 py-2 text-2xl text-white rounded-lg transform translate-y-10">
          <h1>{message}</h1>
        </div>
      )}
    </div>
  );
}
