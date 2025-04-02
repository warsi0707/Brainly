import { useEffect, useState } from "react";
import { BackendUrl } from "../Utils/BackendUrl";

export default function useContent() {
  const [contents, setContnents] = useState([]);
  const GetData = async () => {
    const response = await fetch(`${BackendUrl}/api/v1/content`,{
        method: "GET"
    })
    const result = await response.json()
    if(response.ok){
        setContnents(result.content);
    }   
  };
  useEffect(() => {
    GetData();
    // let interval = setInterval(() => {
      GetData();
    // }, 5*1000);
    // return () => {
    //   clearInterval(interval);
    // };
    // clearInterval(interval)
  }, []);
  return contents;
}
