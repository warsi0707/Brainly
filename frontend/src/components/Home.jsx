import { memo, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import Card from "./Card";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import AddContent from "./AddContent";
import { BackendUrl } from "../Utils/BackendUrl";

function Home() {
  const {setAuthenticated, data, setData} = useContext(AuthContext);
  const [inputTypes, setInputTypes] = useState("")
  const [isPost, setIsPost] = useState(false);

  const handleFilter =async()=>{
    try{
      const response = await fetch(`${BackendUrl}/user/search?types=${inputTypes}`,{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      const result = await response.json()
      if(response.status ==200){
        setData(result.content)
      }
    }catch(error){
      toast.error("Failed")
    }
  }

  const handleSignout = () => {
    localStorage.removeItem("token");
    toast.success("Logout");
    setAuthenticated(false);
  };

  useEffect(()=>{
    handleFilter()
  },[inputTypes])
  return (
    <>
      <div className="min-h-screen w-full ">
        <div className="border-r border-gray-400  min-h-screen w-15 fixed py-5 gap-5 flex justify-start items-center flex-col">
          <Link to={"/"}>
            <img src="/brainly.png" className="w-10 h-10" alt="" />
          </Link>
          <button className="text-xl cursor-pointer">
            <i className="fa-solid fa-user-pen"></i>
          </button>
          <button
            onClick={handleSignout}
            className="text-xl cursor-pointer text-red-500"
          >
            <i className="fa-solid fa-right-to-bracket"></i>
          </button>
        </div>
        <div className="w-full flex flex-col gap-2 min-h-screen pl-20 p-5 py-5">
          <div className="flex gap-2 lg:gap-5">
            <select value={inputTypes} onChange={(e)=> setInputTypes(e.target.value)} className="px-3 py-1 rounded-md bg-gray-200 outline-none">
               <option value="">Select type</option>
              <option value="TEXT">TEXT</option>
              <option value="TWITTER">TWITTER</option>
              <option value="YOUTUBE">YOUTUBE</option>
              <option value="LINK">LINK</option>
            </select>
            <div>
              <button
                onClick={() => setIsPost(!isPost)}
                className="bg-black text-white py-1 cursor-pointer px-8 text-xl rounded-md"
              >
                Post
              </button>
            </div>
          </div>
           { data.length <=0 &&
              <div className="flex justify-center items-center w-full mt-10">
                <p className="text-2xl font-semibold">No data</p>
              </div>
            }
          <div className="min-h-screen  gap-5 pt-5 grid justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data && data.map((item) => <Card key={item._id} item={item} />)}
          </div>
        </div>
      </div>
      {isPost && <AddContent handleClose={() => setIsPost(!isPost)} />}
    </>
  );
}
export default memo(Home);
