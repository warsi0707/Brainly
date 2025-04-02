import { memo } from "react"
import { motion } from "framer-motion"

function AddButton({onclick, type, title,icon, shareBrain}) {
  return (
    <motion.button
    whileHover={{scale:1.1,rotate:2.5}}
    whileTap={{scale:1 }}
    transition={{duration:0.1}}
   
    onClick={type==="add"?onclick:shareBrain} className={`${type==='add' && 'bg-blue-800 hover:bg-blue-500'} ${type==='share' && 'bg-blue-300 text-blue-900 hover:bg-blue-500'}    text-white w-32 flex space-x-2 py-2 justify-center  rounded-md  hover:cursor-pointer transition-all duration-300`}>
     {icon}
      <h1 className='flex flex-col'>{title}</h1>
    </motion.button>
  )
}
export default  memo(AddButton)