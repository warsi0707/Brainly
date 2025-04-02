import { memo } from "react"
import { motion } from "framer-motion"


 function LogButton({type,title,onclick}) {
  return (
    <motion.button
    whileHover={{scale:1.2}}
    whileTap={{scale:0.5}}
    transition={{duration:0.1}}
    onClick={onclick} className={`${type==='signup' && `bg-yellow-500 hover:bg-yellow-800`} ${type==='signin' && `bg-blue-700 hover:to-blue-500`}  ${type==='logout' && `bg-red-500 hover:bg-red-800`}  text-md hidden sm:block py-1 px-3 rounded-md text-white hover:cursor-pointer hover:bg-blue-500 transition-all duration-300`}>
    {title}
  </motion.button>
  )
}
export default memo(LogButton)