import { memo, useState } from "react";
import AddContent from "../components/AddContent";
import useMyDashboard from "../hooks/useMyDashboard";
import Card from "../components/Card";
import useShareBrain from "../hooks/useShareBrain";
import useDeleteContent from "../hooks/useDeleteContent";
import AddButton from "../components/AddButton";

function MyDashboard() {
  const contents = useMyDashboard();
  const DeleteContent = useDeleteContent();
  const ShareBrain = useShareBrain();
  const [modelOpen, setModelOpen] = useState(false);
  return (
    <div className="w-full min-h-[100vh] bg-gray-200 ml-20 sm:ml-40 sm:pl-28 mb-10 py-20 ">
      <AddContent open={modelOpen} setModelOpen={setModelOpen} />
      <div className="btns flex justify-end gap-5">
        <AddButton onclick={() => setModelOpen(true)} type={"add"} title={'Add Content'} icon={<i className="fa-solid fa-plus mt-1"></i>}/>
        <AddButton shareBrain={ShareBrain} type={"share"} title={'Share'} icon={<i className="fa-solid fa-share-nodes mt-1"></i>}/>
      </div>
      {contents.length <= 0 && (
        <div className="h-[80vh] flex justify-center items-center">
          <h1>No contents </h1>
        </div>
      )}
      <div className="h-auto py-10">
        <div className="flex justify-center flex-wrap md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
          {contents.map((item) => (
            <Card
              key={item._id}
              title={item.title}
              type={item.type}
              link={item.link}
              time={item.createdAt}
              owner={item.userid.username}
              onclick={() => DeleteContent(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default memo(MyDashboard);
