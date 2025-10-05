import { useCallback, useContext, useRef } from "react";
import { BackendUrl } from "../Utils/BackendUrl";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import { toast } from "react-hot-toast";
import SignButton from "../components/SignButton";
import SignInput from "../components/SignInput";

export default function Signin() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPassRef = useRef("")
  const { setAuthenticated } = useContext(AuthContext);
  const backendUrl = BackendUrl;
  const navigate = useNavigate();

  const handleSignin = useCallback(async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPassRef.current.value;
    try {
      const response = await fetch(`${backendUrl}/user/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password,confirmPassword }),
      });
      const result = await response.json();
      if (response.status ==200) {
        setAuthenticated(true)
        localStorage.setItem('token', result.token)
        toast.success(result.message);
        setAuthenticated(true);
        navigate("/");
      } else {
        toast.error(result.error)
        setAuthenticated(false);
      }
    } catch (error) {
      toast.error(error);
    }
  }, []);

  return (
    <div className="w-screen min-h-screen flex ">
      <div className="hidden h-screen w-full md:flex justify-center items-center text-center">
        <img src="/login.png" className="w-full h-96 object-cover " alt="" />
      </div>
      <div className=" flex flex-col gap-10 min-h-screen w-full p-5 md:p-10">
        <div className="flex justify-end">
          <p className="bg-black text-white px-10 p-1 rounded-full text-xl">
            Singin
          </p>
        </div>
        <div className="w-full p-2 md:w-96 mx-auto h-full  flex flex-col gap-8 ">
          <div>
            <p className="text-2xl md:text-3xl font-semibold">
              Welcome back to! <br /> brainly
            </p>
            <p>Sign into your account</p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <SignInput refs={emailRef} label={'Email'} placeholder={'User@gmail.com'} type={'email'}/>
            <SignInput refs={passwordRef} label={'Password'} placeholder={'password'} type={'password'}/>
            <SignInput refs={confirmPassRef} label={'Confirm Password'} placeholder={'password'} type={'password'}/>
          </div>
          <SignButton onclick={handleSignin} title={"Signin"}/>
         
          <div className="w-full  text-sm flex flex-col md:flex-row gap-2 justify-center items-center">
            <p className=" ">Don't have an account? </p><Link to={"/signup"} className="text-blue-500">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
