import { memo } from "react";

function SignInput({label,refs, type, placeholder}) {
  return (
    <div className="flex flex-col gap-2 w-full rounded-md">
      <label htmlFor="">{label}</label>
      <input ref={refs} type={type} className="border w-full p-2 rounded-md border-gray-400 outline-none" placeholder={placeholder} />
    </div>
  );
}
export default  memo(SignInput)