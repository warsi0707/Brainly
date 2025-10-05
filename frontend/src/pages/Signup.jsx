import { useCallback, useRef, useState } from "react";
import { BackendUrl } from "../Utils/BackendUrl";
import { Link, useNavigate } from "react-router-dom";
import SignButton from "../components/SignButton";
import toast from "react-hot-toast";
import SignInput from "../components/SignInput";

export default function Signup() {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const emailRef = useRef('')
  const confirmPass = useRef('')
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    const confirmPassword = confirmPass.current.value;

    try {
      const response = await fetch(`${BackendUrl}/api/v1/user/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, confirmPassword }),
      });
      const result = await response.json();
      if (response.status ==200) {
        setLoading(false)
        toast.success(result.message);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        setLoading(false)
        toast.error(result.error);
      }
    } catch (error) {
      setLoading(false)
      toast.error("Failed");
    }
  }
  return (
      <div className="w-screen min-h-screen flex ">
          <div className="hidden h-screen w-full md:flex justify-center items-center text-center">
            <img src="/login.png" className="w-full h-96 object-cover " alt="" />
          </div>
          <div className=" flex flex-col gap-10 min-h-screen w-full p-5 md:p-10">
            <div className="flex justify-end">
              <p className="bg-black text-white px-10 p-1 rounded-full text-xl">
                Register
              </p>
            </div>
            <div className="w-full p-2 md:w-96 mx-auto h-full  flex flex-col gap-8 ">
              <div>
                <p className="text-2xl md:text-3xl font-semibold">
                  Welcome to! <br /> brainly
                </p>
                <p>Register a new account</p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <SignInput refs={usernameRef} label={'Username'} placeholder={'User@12'} type={'text'}/>
                <SignInput refs={emailRef} label={'Email'} placeholder={'User@gmail.com'} type={'Email'}/>
                <SignInput refs={passwordRef} label={'Password'} placeholder={'password'} type={'password'}/>
                <SignInput refs={confirmPass} label={'Confirm Password'} placeholder={'password'} type={'password'}/>
              </div>
              <SignButton loading={loading} onclick={handleSignup} title={"Register"}/>
             
              <div className="w-full  text-sm flex flex-col md:flex-row gap-2 justify-center items-center">
                <p className=" ">Already have an account? </p><Link to={"/signin"} className="text-blue-500">Signin</Link>
              </div>
            </div>
          </div>
        </div>
  );
}
