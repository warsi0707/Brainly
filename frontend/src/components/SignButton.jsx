import { memo } from "react"
import { motion } from "framer-motion"
 function SignButton({onclick, title}) {
  return (
    <button
   onClick={onclick}
    className="bg-blue-500  py-1 rounded-md text-lg hover:bg-sky-600 text-white hover:cursor-pointer transition-all delay-150"
  >
    {title}
  </button>
  )
}
export default memo(SignButton)