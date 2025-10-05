import { memo, useContext } from "react";
import AuthContext from "../context/authContext";
import Card from "./Card";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import AddContent from "./AddContent";

function Home() {
  const { authenticated, setAuthenticated, data } = useContext(AuthContext);
  const [isPost, setIsPost] = useState(false);
  const handleSignout = () => {
    localStorage.removeItem("token");
    toast.success("Logout");
    setAuthenticated(false);
  };

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
            <select className="px-3 py-1 rounded-md bg-gray-200 outline-none">
              <option>Type</option>
              <option>Twitter</option>
              <option>Youtub</option>
              <option>Text</option>
              <option>Notes</option>
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

          <div className="min-h-screen  gap-5 pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {data && data.map((item) => <Card key={item._id} item={item} />)}
          </div>
        </div>
      </div>
      {isPost && <AddContent handleClose={() => setIsPost(!isPost)} />}
    </>
  );
}
export default memo(Home);
