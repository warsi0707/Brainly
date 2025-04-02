import { useCallback, useEffect, useState } from "react";
import { BackendUrl } from "../Utils/BackendUrl";
import toast from "react-hot-toast";

export default function useMyDashboard() {
  const [contents, setContnents] = useState([]);

  const GetData = useCallback(async () => {
    try {
      const response = await fetch(`${BackendUrl}/api/v1/user/contents`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setContnents(result.contents);
      } else {
        setContnents(null);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, []);
  useEffect(() => {
    GetData();
  }, []);
  return contents;
}
