import { useCallback, useContext } from "react";
import SidebarIcon from "./SidebarIcon";
import { Link } from "react-router-dom";
import { BackendUrl } from "../Utils/BackendUrl";
import AuthContext from "../context/authContext";
import toast from "react-hot-toast";
import LogButton from "./LogButton";
import {motion} from 'framer-motion'


export default function SideBar() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const Logout = useCallback(async () => {
    try {
      const response = await fetch(`${BackendUrl}/api/v1/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setAuthenticated(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, []);
  return (
    <div
  
    className="h-screen fixed w-20   sm:w-72 bg-gray-300 border-r-1 border-gray-400 p-2 sm:p-4">
      <Link to={"/"} className="heading mt-3 text-3xl flex gap-2">
        <i className="fa-solid fa-brain mt-1"></i>
        <h1 className="hidden sm:block">Brainly</h1>
      </Link>
      <div className="flex flex-col gap-10 ">
        <div className="content mt-10 sm:ml-5 ">
          <SidebarIcon
            title={"Twiiter"}
            icon={<i className="fa-brands fa-twitter mt-1"></i>}
          />
          <SidebarIcon
            title={"Videos"}
            icon={<i className="fa-brands fa-youtube"></i>}
          />
          <SidebarIcon
            title={"Documents"}
            icon={<i className="fa-solid fa-file"></i>}
          />
          <SidebarIcon
            title={"Links"}
            icon={<i className="fa-solid fa-link"></i>}
          />
          <SidebarIcon
            title={"Tags"}
            icon={<i className="fa-solid fa-hashtag"></i>}
          />
        </div>
        <div className=" mt-10 sm:ml-10 sm:flex sm:gap-2 ">
          {authenticated ? (
            <>
              <LogButton onclick={Logout} type={"logout"} title={"Logout"} />
              <button
                onClick={Logout}
                className="sm:hidden cursor-pointer text-2xl flex  mx-auto"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center text-2xl gap-2 sm:hidden">
                <Link to={"/signin"}>
                  <i className="fa-solid fa-right-to-bracket"></i>
                </Link>
                <Link to={"/signup"}>
                  <i className="fa-solid fa-user"></i>
                </Link>
              </div>
              <div className=" hidden sm:flex gap-5">
                <Link to={"/signin"}>
                  <LogButton type={"signin"} title={"Signin"} />
                </Link>
                <Link to={"/signup"}>
                  <LogButton type={"signup"} title={"Signup"} />
                </Link>{" "}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
