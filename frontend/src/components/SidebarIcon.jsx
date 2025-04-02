import { memo } from "react"


 function SidebarIcon({title, icon}) {
  return (
    <div className='flex justify text-xl gap-3 mb-5 hover:cursor-pointer hover:bg-gray-200 p-2 pl-5 rounded-xl transition-all duration-300'>
       <p> {icon}</p>
        <h1 className="hidden sm:block">{title}</h1>
    </div>
  )
}
export default memo(SidebarIcon)