import { useCallback, useContext, useRef } from "react";
import { BackendUrl } from "../Utils/BackendUrl";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import { toast } from "react-hot-toast";
import UserAuthInput from "../components/UserAuthInput";
import SignButton from "../components/SignButton";

export default function Signin() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { setAuthenticated } = useContext(AuthContext);
  const backendUrl = BackendUrl;
  const navigate = useNavigate();

  const Signin = useCallback(async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await fetch(`${backendUrl}/api/v1/user/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setAuthenticated(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, []);
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white min-w-72  rounded-xl p-3 ">
        <div className="mt-5 flex flex-col gap-5">
          <UserAuthInput
            placeholder={"Samir@123"}
            type={"text"}
            refs={usernameRef}
          />
          <UserAuthInput type={"password"} refs={passwordRef} />
          <Link className="underline" to={"/signup"}>Create an account</Link>
          <SignButton onclick={Signin} title={"Signin"} />
        </div>
      </div>
    </div>
  );
}
