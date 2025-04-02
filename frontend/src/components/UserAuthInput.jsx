import { memo } from "react"

 function UserAuthInput({refs,type, placeholder}) {
  return (
    <input
    ref={refs}
    className="w-full text-center p-2 border-2 border-gray-100 rounded-lg text-xl"
    type={type}
    placeholder={placeholder}
  />
  )
}
export default memo(UserAuthInput)