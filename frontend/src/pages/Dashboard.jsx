import { memo, useContext, useState } from "react";
import Card from "../components/Card";
import AddButton from "../components/AddButton";
import AddContnet from "../components/AddContent";
import useContent from "../hooks/useContent";
import useShareBrain from "../hooks/useShareBrain";
import AuthContext from "../context/authContext";

export default  function Dashboard() {
  const { authenticated } = useContext(AuthContext);
  const [modelOpen, setModelOpen] = useState(false);
  const contents = useContent();
  const ShareBrain = useShareBrain();

  return (
    <div>

    </div>
  );
}

