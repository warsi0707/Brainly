import { memo } from "react"

 function SignButton({onclick, title,loading}) {
  return (
     <button onClick={onclick} className="bg-black text-white p-2 w-full rounded-md cursor-pointer">{`${loading? "Loading...": title}`}</button>
  )
}
export default memo(SignButton)