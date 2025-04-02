import { BackendUrl } from '../Utils/BackendUrl';
import toast from 'react-hot-toast';

export default function useShareBrain() {
    const ShareBrain = async () => {
        try{
          const response = await fetch(`${BackendUrl}/api/v1/content/brain/share`, {
            method: "POST",
            credentials: "include",
          });
          const result = await response.json();
          if(response.ok){
            toast.success(result.link);
          }else{
            toast.error(result.message)
          }
        }catch(error){
          toast.error(error.message)
        }
      }
      return (
        ShareBrain
      )
}
