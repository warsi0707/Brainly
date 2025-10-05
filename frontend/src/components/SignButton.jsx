import { memo } from "react"

 function SignButton({onclick, title}) {
  return (
     <button onClick={onclick} className="bg-black text-white p-2 w-full rounded-md cursor-pointer">{title}</button>
  )
}
export default memo(SignButton)