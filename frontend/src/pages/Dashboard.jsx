import { memo, useContext, useState } from "react";
import Card from "../components/Card";
import AddButton from "../components/AddButton";
import AddContnet from "../components/AddContent";
import useContent from "../hooks/useContent";
import useShareBrain from "../hooks/useShareBrain";
import AuthContext from "../context/authContext";

function Dashboard() {
  const { authenticated } = useContext(AuthContext);
  const [modelOpen, setModelOpen] = useState(false);
  const contents = useContent();
  const ShareBrain = useShareBrain();

  return (
    <div className="w-full h-auto bg-gray-200 ml-20 sm:ml-40 sm:pl-28 mb-10 py-20 ">
      <AddContnet open={modelOpen} setModelOpen={setModelOpen} />
      {authenticated && (
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
      )}
      <div className="py20">
        <div className="flex justify-center flex-wrap md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
          {contents.map((item) => (
            <Card
              key={item._id}
              title={item.title}
              type={item.type}
              link={item.link}
              time={item.createdAt}
              owner={item.userid.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default memo(Dashboard);
