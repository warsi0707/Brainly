import{useState } from "react";
import Card from "../components/Card";
import AddButton from "../components/AddButton";
// import ShareButton from "../components/ShareButton";
import AddContnet from "../components/AddContent";
import SideBar from "../components/SideBar";
import { BackendUrl } from "../Utils/BackendUrl";
import useContent from "../hooks/useContent";
import ErrorMessage from "../components/ErrorMessage";

export default function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [message, setMessage] = useState("")
  const contents = useContent();

  const ShareBrain = async () => {
    const response = await fetch(`${BackendUrl}/api/v1/brain/share`, {
      method: "POST",
      credentials: "include",
    });
    const result = await response.json();
    if(response.ok){
      alert(result.link);
    }else{
      setMessage(result.message)
      setTimeout(() => {
        setMessage("")
      }, 3000);
    }
   
  };

  return (
    <div className="flex ">
      <div>
        <SideBar />
      </div>
      <div className="p-4 bg-gray-200 w-full  min-h-screen ">
        <AddContnet
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        />
        <div className="btns flex justify-end gap-5">
          <AddButton
            onClose={() => {
              setModelOpen(true);
            }}
          />
          {/* <ShareButton /> */}
          <button
            onClick={ShareBrain}
            className="bg-blue-300 text-blue-900 w-32 flex space-x-2 py-2 justify-center  rounded-md hover:bg-blue-200 hover:cursor-pointer transition-all duration-300"
          >
            <i className="fa-solid fa-share-nodes mt-1"></i>
            <p className="flex flex-col">Share</p>
          </button>
        </div>
        <div>
          <div className="flex flex-wrap md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
            {contents.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                type={item.type}
                link={item.link}
                time={item.createdAt}
              />
            ))}
          </div>
          {message && <ErrorMessage message={message}/>}
        </div>
      </div>
    </div>
  );
}
