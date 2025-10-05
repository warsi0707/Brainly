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
    <div></div>
  );
}
export default memo(MyDashboard);
