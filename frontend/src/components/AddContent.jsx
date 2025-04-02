import { memo, useRef } from "react";
import { BackendUrl } from "../Utils/BackendUrl";
import { useNavigate } from "react-router-dom";
import AddInput from "./AddInput";
import toast from "react-hot-toast";

function AddContnet({ open, setModelOpen }) {
  const linkRef = useRef();
  const typeRef = useRef();
  const titleRef = useRef();
  const navigate = useNavigate();

  const AddData = async () => {
    const link = linkRef.current.value;
    const type = typeRef.current.value;
    const title = titleRef.current.value;
    try {
      const response = await fetch(`${BackendUrl}/api/v1/content`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link, type, title }),
      });
      const result = await response.json();
      if (response.ok) {
        setModelOpen(false);
        toast.success(result.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
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
                    <i
                      onClick={() => setModelOpen(false)}
                      className="fa-solid fa-xmark"
                    ></i>
                  </div>
                </div>
                <div className=" flex flex-col gap-2 mt-3">
                  <AddInput
                    placeholder={"Title"}
                    type={"Text"}
                    refs={titleRef}
                  />
                  <AddInput
                    placeholder={"Twitter | YouuTube | Text"}
                    type={"Text"}
                    refs={typeRef}
                  />
                  <AddInput placeholder={"Link"} type={"Text"} refs={linkRef} />

                  <button
                    onClick={AddData}
                    className="bg-sky-300 p-2 text-white rounded-md hover:cursor-pointer hover:bg-sky-400 transition-all duration-300 text-xl"
                  >
                    Submit
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default memo(AddContnet);
