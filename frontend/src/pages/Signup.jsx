import { useCallback, useRef } from "react";
import { BackendUrl } from "../Utils/BackendUrl";
import { Link, useNavigate } from "react-router-dom";
import UserAuthInput from "../components/UserAuthInput";
import SignButton from "../components/SignButton";
import toast from "react-hot-toast";

export default function Signup() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const Signup = useCallback(async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await fetch(`${BackendUrl}/api/v1/user/signup`, {
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
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        toast.success(result.message);
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
            placeholder={"samir@123"}
            type={"text"}
            refs={usernameRef}
          />
          <UserAuthInput type={"password"} refs={passwordRef} />
          <Link className="underline" to={"/signin"}>Already have an account? Login</Link>
          <SignButton onclick={Signup} title={"Signup"} />
        </div>
      </div>
    </div>
  );
}
